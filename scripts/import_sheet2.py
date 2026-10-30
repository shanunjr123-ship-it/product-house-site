#!/usr/bin/env python3
"""
Second inventory sheet (concrete-pump spare parts, codes 201010-xxx) -> website data, MERGED with the existing catalogue.

  python3 scripts/import_sheet2.py "path/to/Inventory_2.xlsx"

Reads:  the sheet (header row 'NUMBER | PART CODE | PART NUMBER(=name) | Arabic | ... | brand code | description')
Keeps:  data/products.json entries whose code does not start with 201010 (the old 843), then adds the new ones in front.
Writes: data/products.json, public/products/<code>.<ext> (the photo exactly as embedded in the sheet, untouched),
        data/review.txt (what could not be classified)

Deliberately NOT imported: prices, stock quantities, shelf locations, the sheet's machine-translated Arabic names
(replaced by the glossary below) and its 9 free-text descriptions (some were wrong).
Arabic names come from the glossary in this file: technical Arabic for each part type + the size/spec tokens of the
English name + the brand. They are drafts for the business to verify, like the rest of the Arabic taxonomy.
"""
import io, json, re, sys
from pathlib import Path

import openpyxl
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent

# ------------------------------------------------------------------ brands
BRANDS = {  # slug: (English, Arabic)
    "putzmeister": ("Putzmeister", "بوتزمايستر"),
    "schwing": ("Schwing", "شوينج"),
    "cifa": ("CIFA", "سيفا"),
    "sany": ("Sany", "ساني"),
    "zoomlion": ("Zoomlion", "زومليون"),
    "everdigm": ("Everdigm", "إيفرديجم"),
    "junjin": ("Junjin", "جونجين"),
    "rexroth": ("Rexroth", "ريكسروث"),
    "hydac": ("Hydac", "هيداك"),
    "bosch": ("Bosch", "بوش"),
}
CODE_BRAND = {"PM": ["putzmeister"], "SC": ["schwing"], "SW": ["schwing"], "SA": ["sany"], "ZM": ["zoomlion"], "Z0": ["zoomlion"],
              "ED": ["everdigm"], "JJ": ["junjin"], "JN": ["junjin"], "CIFA": ["cifa"], "SA/PM": ["sany", "putzmeister"]}
NAME_BRAND = [("putzmeister", r"\bputzmeister\b|\bpm\b"), ("schwing", r"\bschwing\b"), ("cifa", r"\bcifa\b"), ("sany", r"\bsany\b|\bsy\b"),
              ("zoomlion", r"\bzoomlion\b|\bzm\b"), ("everdigm", r"\beverdigm\b"), ("junjin", r"\bjunjin\b"), ("rexroth", r"\brexroth\b|\brexoth\b"),
              ("hydac", r"\bhydac\b"), ("bosch", r"\bbosch\b")]

# ------------------------------------------------------------------ typo fixes (applied to the upper-case name)
TYPOS = [
    (r"\bRINKG\b", "RING"), (r"\bLINNING\b", "LINING"), (r"\bSCWING\b|\bSHWING\b", "SCHWING"), (r"\bHYDROLIC\b|\bHYDRULIC\b", "HYDRAULIC"),
    (r"\bHYDR\.?(?=\s)", "HYDRAULIC"), (r"\bHYD\b", "HYDRAULIC"), (r"\bGUAGE\b", "GAUGE"), (r"\bCATRIDGE\b", "CARTRIDGE"),
    (r"\bTEPERD\b|\bTAPERD\b|\bTEPERED\b", "TAPERED"), (r"\bORGINAL\b", "ORIGINAL"), (r"\bERCONOC\b", "ERGONIC"), (r"\bWAERING\b", "WEARING"),
    (r"\bSP\[ECTACLE\b", "SPECTACLE"), (r"\bVACCUM\b", "VACUUM"), (r"\bFILTERN\b", "FILTER"), (r"\bFILTERPUMP\b", "FILTER PUMP"),
    (r"\bCLAM COUPLING\b", "CLAMP COUPLING"), (r"\bSUPPRTING\b", "SUPPORTING"), (r"\bSPLINDED\b", "SPLINED"), (r"\bMEDIAM\b", "MEDIUM"),
    (r"\bBARIABLE\b", "VARIABLE"), (r"\bSWICH\b", "SWITCH"), (r"\bHEX MUT\b", "HEX NUT"), (r"\bCAO\b", "CAP"), (r"\bSEALKIT\b", "SEAL KIT"),
    (r"\bSEALSET\b", "SEAL SET"), (r"\bCARDEN\b", "CARDAN"), (r"\bCMPLT\b|\bCMPL\b", "COMPLETE"), (r"\bASSLY\b", "ASSEMBLY"),
    (r"\bBACK UP\b", "BACK-UP"), (r"\bBACKET\b", "BRACKET"), (r"\bCOLLER\b", "COOLER"), (r"\bMIER\b", "MIXER"), (r"\bLEVERQ", "LEVER Q"), (r"\bMOUNTING COUPLING 5\b", 'MOUNTING COUPLING 5.5"'),
    (r"\bBOLTS\b", "BOLT"), (r"\bREXOTH\b", "REXROTH"), (r"\bSEALING DN\b", "SEAL DN"), (r"\bPLM20\b", "PLM20"), (r"\\", "/"),
    (r"\bUPPERHOUSING\b", "UPPER HOUSING"), (r"\bOUTERHOUSING\b", "OUTER HOUSING"), (r"\bCONNECTIONR\b", "CONNECTION"),
    (r"\)MEDIUM", ") MEDIUM"), (r"[{}]", ""), (r"\s/(?=BEST|DBL)", " "),
    (r"\bPRESSURE GUAGE\b", "PRESSURE GAUGE"), (r"\bSOOFA\b", "SLEEVE"), (r"\bBOCK\b", "BOCK"), (r"\bSHAWEL\b", "SHAWEL"),
]
KEEP_UPPER = {"DN", "PM", "PU", "TM", "ZM", "SK", "DU", "HD", "LHS", "RHS", "FD", "SUN", "ZX", "SX", "DIN", "ISO", "SY", "RB", "QL", "HBC", "AT", "HP", "PTO",
              "FAG", "NBR", "HYPRO", "BA", "QD", "CM", "A", "B", "C", "D", "S", "R", "T", "V", "X", "OMP", "BMP", "OMH", "CMFA", "PLM", "UP", "II", "SC", "KG",
              "CMPL", "RAL", "AK2", "TUE", "SV", "DBDS", "JMFH", "DG4V", "DS3", "DS5", "TA", "G1", "SO"}
BRAND_CASE = {"CIFA": "CIFA", "SCHWING": "Schwing", "SANY": "Sany", "ZOOMLION": "Zoomlion", "EVERDIGM": "Everdigm", "JUNJIN": "Junjin", "PUTZMEISTER": "Putzmeister",
              "REXROTH": "Rexroth", "HYDAC": "Hydac", "BOSCH": "Bosch", "HETRONIC": "Hetronic", "ERGONIC": "Ergonic", "FAG": "FAG", "TAIWAN": "Taiwan"}

# ------------------------------------------------------------------ glossary: key -> Arabic part name, description (EN / AR)
G = {}


def t(key, ar, de="", da=""):
    G[key] = dict(ar=ar, de=de, da=da)


# S-valve and wear parts
t("spectacle_plate", "لوحة النظارة", "Spectacle wear plate: the hardened plate at the hopper outlet that the S-valve and cutting ring slide against. It is a main wear part and is normally replaced together with the cutting ring.", "لوحة النظارة (لوحة التآكل): لوحة مقوّاة عند مخرج القادوس يحتك بها صمام S وحلقة القطع. من أكثر قطع المضخة استهلاكًا وتُستبدل عادةً مع حلقة القطع.")
t("wear_plate", "لوحة التآكل", "Wear plate for the hopper outlet of a concrete pump; the surface the S-valve moves against.", "لوحة تآكل لمخرج قادوس مضخة الخرسانة، وهي السطح الذي يتحرك عليه صمام S.")
t("cutting_ring", "حلقة القطع", "Cutting ring: the ring on the S-valve inlet that seals against the wear plate and shears the concrete column. It wears with use and is replaced as a set with the wear plate.", "حلقة القطع: حلقة عند مدخل صمام S تلامس لوحة التآكل وتقطع عمود الخرسانة. تتآكل مع الاستخدام وتُستبدل مع اللوحة.")
t("wear_ring", "حلقة التآكل", "Wear ring for the S-valve / delivery side of a concrete pump.", "حلقة تآكل لجانب صمام S والضخ في مضخة الخرسانة.")
t("thrust_ring", "حلقة الدفع", "Thrust ring: takes the axial load in the S-valve bearing housing and keeps the S-tube seated against the wear plate.", "حلقة الدفع: تتحمل الحمل المحوري في غلاف محمل صمام S وتبقي الأنبوب ملامسًا للوحة التآكل.")
t("wear_insert", "حشوة تآكل", "Wear insert for the S-valve / hopper outlet of a concrete pump.", "حشوة تآكل لصمام S ومخرج القادوس في مضخة الخرسانة.")
t("wear_sleeve", "جلبة التآكل", "Wear sleeve for the S-valve shaft housing of a concrete pump.", "جلبة تآكل لغلاف عمود صمام S في مضخة الخرسانة.")
t("wear_bush", "جلبة تآكل", "Wear bush for the S-valve shaft of a concrete pump.", "جلبة تآكل لعمود صمام S في مضخة الخرسانة.")
t("cutting_spring", "زنبرك حلقة القطع", "Spring that keeps the cutting ring pressed against the wear plate.", "زنبرك يضغط حلقة القطع على لوحة التآكل.")
t("housing_lining", "بطانة الغلاف", "Lining for the S-valve bearing housing.", "بطانة لغلاف محمل صمام S.")
t("upper_housing", "الغلاف العلوي", "Upper housing of the S-valve shaft assembly (bearing housing at the hopper).", "الغلاف العلوي لمجموعة عمود صمام S (غلاف المحمل عند القادوس).")
t("outer_housing", "الغلاف الخارجي", "Outer housing of the S-valve shaft assembly.", "الغلاف الخارجي لمجموعة عمود صمام S.")
t("discharge_support", "دعامة التفريغ", "Discharge support (outlet bearing support) of the S-valve.", "دعامة التفريغ (حامل مخرج) لصمام S.")
t("support_flange", "شفة الدعم", "Support flange for the S-valve shaft assembly.", "شفة دعم لمجموعة عمود صمام S.")
t("bearing_flange", "شفة المحمل", "Bearing flange of the S-valve shaft assembly.", "شفة المحمل لمجموعة عمود صمام S.")
t("s_valve", "صمام S", "S-valve: the swinging S-shaped tube that connects each delivery cylinder to the outlet pipe in turn.", "صمام S: أنبوب على شكل حرف S يتحرك ليصل كل أسطوانة ضخ بخط التوصيل بالتناوب.")
t("rock_valve", "صمام الروك", "Rock valve (rocker valve) for concrete pumps.", "صمام روك (صمام دوّار) لمضخات الخرسانة.")
t("s_shaft_bearing", "مجموعة محمل عمود S", "Upper bearing assembly for the S-valve shaft.", "مجموعة المحمل العلوي لعمود صمام S.")
t("slewing_lever", "ذراع الدوران", "Slewing (swing) lever that turns the S-valve shaft.", "ذراع دوران يحرّك عمود صمام S.")
t("slewing_shaft", "عمود الدوران", "Slewing shaft of the S-valve.", "عمود الدوران لصمام S.")
t("compensating_ring", "حلقة التعويض", "Compensating ring for the S-valve seal pack.", "حلقة تعويض لحزمة أختام صمام S.")
t("intermediate_ring", "حلقة وسيطة", "Intermediate ring for the S-valve housing.", "حلقة وسيطة لغلاف صمام S.")
t("ball_cup", "كأس الكرة", "Ball cup for the S-valve / slewing assembly.", "كأس كرة لمجموعة صمام S والدوران.")
# pipes
t("elbow", "كوع", "Delivery-line elbow for concrete pumps, in the size and angle shown in the name.", "كوع لخط ضخ الخرسانة بالمقاس والزاوية الموضّحة في الاسم.")
t("bend", "منحنى", "Delivery-line bend for concrete pumps.", "منحنى لخط ضخ الخرسانة.")
t("tapered_pipe", "أنبوب مخروطي", "Tapered (reducing) delivery pipe that steps the line down in diameter.", "أنبوب ضخ مخروطي يقلّل قطر الخط تدريجيًا.")
t("reducer_pipe", "أنبوب مخفّض", "Reducer pipe for the delivery line of a concrete pump.", "أنبوب مخفّض لخط ضخ الخرسانة.")
t("delivery_pipe", "أنبوب ضخ", "Delivery pipe for the boom and delivery line of a concrete pump.", "أنبوب ضخ لذراع وخط توصيل مضخة الخرسانة.")
t("pipe", "أنبوب", "Pipe for the delivery line of a concrete pump.", "أنبوب لخط ضخ الخرسانة.")
t("s_pipe", "أنبوب S", "S-pipe for the delivery line of a concrete pump.", "أنبوب S لخط ضخ الخرسانة.")
t("clamp_coupling", "وصلة مشبك", "Clamp coupling that joins two delivery pipes; sized by pipe diameter.", "وصلة مشبك تربط أنبوبي ضخ، ويُحدَّد مقاسها بقطر الأنبوب.")
t("coupling", "وصلة", "Delivery-pipe coupling for concrete pumps.", "وصلة لأنابيب ضخ الخرسانة.")
t("cup_coupling", "وصلة كأسية", "Cup-type delivery-pipe coupling for concrete pumps.", "وصلة كأسية لأنابيب ضخ الخرسانة.")
t("screw_coupling", "وصلة لولبية", "Screw-type delivery-pipe coupling for concrete pumps.", "وصلة لولبية لأنابيب ضخ الخرسانة.")
t("bolt_coupling", "وصلة بمسامير", "Bolt-type delivery-pipe coupling for concrete pumps.", "وصلة بمسامير لأنابيب ضخ الخرسانة.")
t("mount_coupling", "وصلة تركيب", "Mounting coupling for delivery pipes.", "وصلة تركيب لأنابيب الضخ.")
t("snap_coupling", "وصلة سريعة", "Snap coupling for delivery pipes.", "وصلة سريعة لأنابيب الضخ.")
t("cement_coupling", "وصلة أسمنت", "Cement-hose coupling.", "وصلة لخرطوم الأسمنت.")
t("storz_coupling", "وصلة ستورز", "Storz coupling for water and flushing lines.", "وصلة ستورز لخطوط المياه والغسيل.")
t("welding_flange", "شفة لحام", "Weld-on flange for delivery pipes.", "شفة لحام لأنابيب الضخ.")
t("flange", "شفة", "Flange for delivery pipes.", "شفة لأنابيب الضخ.")
t("tube_support", "حامل أنبوب", "Tube support for the delivery line.", "حامل أنبوب لخط الضخ.")
t("collar", "طوق", "Collar for delivery-pipe couplings.", "طوق لوصلات أنابيب الضخ.")
t("foldable_elbow", "كوع قابل للطي", "Foldable elbow for the delivery line.", "كوع قابل للطي لخط الضخ.")
t("connection_piece", "قطعة توصيل", "Connection piece / bend for the delivery line.", "قطعة توصيل لخط الضخ.")
t("wedge", "إسفين", "Wedge for delivery-pipe or housing couplings.", "إسفين لوصلات أنابيب الضخ أو الأغلفة.")
t("tightening_strap", "حزام شد", "Tightening strap for delivery pipes.", "حزام شد لأنابيب الضخ.")
t("sponge_ball", "كرة إسفنجية للتنظيف", "Sponge cleaning ball pushed through the delivery pipe with water or air to clear leftover concrete.", "كرة إسفنجية لتنظيف الأنبوب تُدفع بالماء أو الهواء لإخراج بقايا الخرسانة.")
t("cleaning_board", "لوح تنظيف", "Cleaning board for the delivery line.", "لوح تنظيف لخط الضخ.")
t("u_bolt", "مسمار U", "U-bolt / stirrup for pipe fixing.", "مسمار U لتثبيت الأنابيب.")
# hoses
t("end_hose", "خرطوم النهاية", "End hose fitted at the tip of the placing boom.", "خرطوم النهاية المركّب في طرف ذراع الضخ.")
t("flat_hose", "خرطوم مسطّح", "Flat (layflat) hose.", "خرطوم مسطّح.")
t("hp_hose", "خرطوم ضغط عالٍ", "High-pressure hose.", "خرطوم ضغط عالٍ.")
t("hose_clamp", "مشبك خرطوم", "Clamp for the end hose.", "مشبك لخرطوم النهاية.")
t("hose_stand", "حامل خرطوم النهاية", "Holding stand for the end hose.", "حامل لخرطوم النهاية.")
# pistons and cylinders
t("ram_piston", "مكبس الضخ", "Delivery ram piston of a concrete pump.", "مكبس ضخ (رام) لمضخة الخرسانة.")
t("piston", "مكبس", "Delivery piston of a concrete pump.", "مكبس ضخ لمضخة الخرسانة.")
t("rubber_piston", "مكبس مطاطي", "Rubber delivery piston for the pumping cylinders.", "مكبس ضخ مطاطي لأسطوانات الضخ.")
t("pu_piston", "مكبس بولي يوريثان", "Polyurethane (PU) delivery piston for the pumping cylinders.", "مكبس ضخ من البولي يوريثان لأسطوانات الضخ.")
t("piston_rod", "ساق المكبس", "Piston rod of a hydraulic drive cylinder.", "ساق مكبس لأسطوانة هيدروليكية.")
t("piston_head", "رأس المكبس", "Piston head.", "رأس مكبس.")
t("plunger_cyl", "أسطوانة غاطسة", "Plunger cylinder of the pump drive.", "أسطوانة غاطسة (بلنجر) لمحرك المضخة.")
t("delivery_cyl", "أسطوانة الضخ", "Delivery (concrete) cylinder of a concrete pump.", "أسطوانة ضخ الخرسانة في المضخة.")
t("switching_cyl", "أسطوانة التبديل", "Switching cylinder that moves the S-valve.", "أسطوانة تبديل تحرّك صمام S.")
t("cylinder", "أسطوانة", "Hydraulic cylinder.", "أسطوانة هيدروليكية.")
t("rod_eye", "عين الساق", "Rod eye for a hydraulic cylinder.", "عين ساق لأسطوانة هيدروليكية.")
# seals
t("seal_kit", "طقم أختام", "Seal kit for the component named; ask us for the matching OEM number.", "طقم أختام للقطعة المذكورة في الاسم. اسألنا عن رقم القطعة الأصلي المطابق.")
t("repair_kit", "طقم إصلاح", "Repair kit for the component named.", "طقم إصلاح للقطعة المذكورة في الاسم.")
t("o_ring", "حلقة O", "O-ring in the size and material shown in the name.", "حلقة O بالمقاس والخامة الموضّحة في الاسم.")
t("lip_seal", "ختم شفاه", "Lip seal ring.", "حلقة ختم بشفاه.")
t("felt_seal", "ختم لباد", "Felt seal.", "ختم لباد.")
t("gasket", "حشية", "Gasket.", "حشية.")
t("gasket_set", "طقم حشيات", "Gasket set.", "طقم حشيات.")
t("backup_ring", "حلقة دعم", "Back-up ring for hydraulic seals.", "حلقة دعم للأختام الهيدروليكية.")
t("guide_ring", "حلقة توجيه", "Guide ring for the delivery piston or hydraulic cylinder.", "حلقة توجيه لمكبس الضخ أو الأسطوانة الهيدروليكية.")
t("guide_band", "شريط توجيه", "Guide band for hydraulic cylinders.", "شريط توجيه للأسطوانات الهيدروليكية.")
t("scraper_ring", "حلقة كشط", "Scraper ring for hydraulic rods.", "حلقة كشط لسيقان الأسطوانات الهيدروليكية.")
t("wiper_ring", "حلقة مسح", "Wiper ring for hydraulic rods.", "حلقة مسح لسيقان الأسطوانات الهيدروليكية.")
t("compression_ring", "حلقة ضغط", "Compression ring (plain) for sealing.", "حلقة ضغط للإحكام.")
t("rod_seal", "ختم الساق", "Rod seal for a hydraulic cylinder.", "ختم ساق لأسطوانة هيدروليكية.")
t("shaft_seal", "ختم العمود", "Shaft seal.", "ختم عمود.")
t("oil_seal", "ختم زيت", "Oil seal.", "ختم زيت.")
t("piston_seal", "ختم المكبس", "Delivery piston seal.", "ختم مكبس الضخ.")
t("seal", "ختم", "Seal.", "ختم.")
t("sealing_ring", "حلقة ختم", "Sealing ring.", "حلقة ختم.")
t("sealing_cover", "غطاء الختم", "Sealing cover.", "غطاء ختم.")
t("seal_support", "دعامة الختم", "Seal support.", "دعامة ختم.")
t("rubber_seal", "ختم مطاطي", "Rubber seal for delivery-pipe couplings.", "ختم مطاطي لوصلات أنابيب الضخ.")
t("pu_seal", "ختم بولي يوريثان", "Polyurethane seal for delivery-pipe couplings.", "ختم من البولي يوريثان لوصلات أنابيب الضخ.")
t("round_cord", "حبل مطاطي دائري", "Round sealing cord.", "حبل ختم مطاطي دائري.")
t("retaining_ring", "حلقة تثبيت", "Retaining / securing ring.", "حلقة تثبيت.")
# valves
t("way_valve", "صمام اتجاهي", "Hydraulic directional control valve.", "صمام تحكم اتجاهي هيدروليكي.")
t("solenoid_valve", "صمام سولينويد", "Solenoid-operated hydraulic valve.", "صمام هيدروليكي يعمل بالملف الكهربائي (سولينويد).")
t("check_valve", "صمام عدم رجوع", "Hydraulic check valve.", "صمام عدم رجوع هيدروليكي.")
t("balance_valve", "صمام موازنة", "Balance (counterbalance) valve.", "صمام موازنة.")
t("flow_valve", "صمام تحكم بالتدفق", "Flow control valve.", "صمام تحكم بالتدفق.")
t("overflow_valve", "صمام تصريف زائد", "Overflow valve.", "صمام تصريف زائد.")
t("pressure_limit_valve", "صمام تحديد الضغط", "Pressure limiting (relief) valve.", "صمام تحديد الضغط.")
t("pressure_valve", "صمام ضغط", "Pressure valve.", "صمام ضغط.")
t("cartridge_valve", "صمام خرطوشة", "Hydraulic cartridge valve.", "صمام هيدروليكي نوع خرطوشة.")
t("distributor_valve", "صمام توزيع", "Distributor valve (central lubrication).", "صمام توزيع (للتشحيم المركزي).")
t("prop_valve", "صمام تناسبي", "Proportional hydraulic valve.", "صمام هيدروليكي تناسبي.")
t("valve", "صمام", "Valve.", "صمام.")
t("valve_body", "جسم الصمام", "Valve body.", "جسم صمام.")
t("solenoid_coil", "ملف سولينويد", "Solenoid coil for a hydraulic valve.", "ملف سولينويد لصمام هيدروليكي.")
# pumps and motors
t("hyd_pump", "مضخة هيدروليكية", "Hydraulic pump for concrete pump and mixer drives.", "مضخة هيدروليكية لمحركات مضخات الخرسانة والخلاطات.")
t("hyd_motor", "محرك هيدروليكي", "Hydraulic motor.", "محرك هيدروليكي.")
t("gear_pump", "مضخة تروس", "Gear pump.", "مضخة تروس.")
t("charge_pump", "مضخة شحن", "Charge pump for a closed-circuit hydraulic pump.", "مضخة شحن لمضخة هيدروليكية بدائرة مغلقة.")
t("water_pump", "مضخة مياه", "Water pump for the pump's washing system.", "مضخة مياه لنظام الغسيل في المضخة.")
t("flush_pump", "مضخة مياه الغسيل", "Flushing water pump.", "مضخة مياه الغسيل.")
t("diesel_pump", "مضخة ديزل", "Diesel transfer pump.", "مضخة نقل ديزل.")
t("motor", "محرك", "Motor.", "محرك.")
# filters, cooling
t("filter", "فلتر", "Filter.", "فلتر.")
t("filter_element", "عنصر فلتر", "Filter element.", "عنصر فلتر.")
t("air_filter", "فلتر هواء", "Air filter.", "فلتر هواء.")
t("filter_pump", "فلتر المضخة", "Hydraulic pump filter.", "فلتر المضخة الهيدروليكية.")
t("fan", "مروحة", "Cooling fan for the hydraulic oil cooler.", "مروحة تبريد لمبرّد الزيت الهيدروليكي.")
t("cooler", "مبرّد", "Cooler.", "مبرّد.")
t("oil_cooler", "مبرّد زيت", "Hydraulic oil cooler.", "مبرّد زيت هيدروليكي.")
# electrical
t("limit_switch", "مفتاح حد", "Limit switch.", "مفتاح حد (ليمت سويتش).")
t("prox_switch", "مفتاح تقارب", "Proximity switch.", "مفتاح تقارب.")
t("switch", "مفتاح", "Switch.", "مفتاح كهربائي.")
t("press_button", "زر ضغط", "Push-button switch.", "زر ضغط.")
t("toggle_switch", "مفتاح تبديل", "Toggle switch.", "مفتاح تبديل.")
t("relay", "ريليه", "Relay.", "ريليه.")
t("breaker", "قاطع دائرة", "Circuit breaker.", "قاطع دائرة.")
t("sensor", "حساس", "Sensor.", "حساس.")
t("temp_sensor", "حساس حرارة", "Temperature sensor.", "حساس حرارة.")
t("pressure_sensor", "حساس ضغط", "Pressure sensor.", "حساس ضغط.")
t("transducer", "مرسل", "Transducer / transmitter.", "مرسل إشارة.")
t("gauge", "مانومتر", "Pressure gauge.", "مانومتر (مقياس ضغط).")
t("vacuum_gauge", "مقياس تفريغ", "Vacuum gauge.", "مقياس تفريغ.")
t("oil_gauge", "مؤشر مستوى الزيت", "Oil level gauge (sight glass).", "مؤشر مستوى زيت (زجاجة مراقبة).")
t("level_indicator", "مؤشر مستوى", "Level indicator.", "مؤشر مستوى.")
t("control_box", "صندوق تحكم", "Control box.", "صندوق تحكم.")
t("estop_box", "صندوق إيقاف الطوارئ", "Emergency-stop box.", "صندوق إيقاف الطوارئ.")
t("battery", "بطارية", "Battery for the remote control.", "بطارية للريموت.")
t("charger", "شاحن بطارية", "Battery charger.", "شاحن بطارية.")
t("cable", "كابل", "Cable.", "كابل.")
t("plug", "قابس", "Plug / connector.", "قابس (موصّل).")
t("aerial", "هوائي", "Aerial (antenna).", "هوائي (أنتينا).")
# bearings and bushings
t("bearing", "محمل", "Bearing.", "محمل.")
t("agitator_bearing", "محمل المقلّب", "Agitator bearing for the hopper.", "محمل المقلّب في القادوس.")
t("roller_bearing", "محمل أسطواني", "Roller bearing.", "محمل أسطواني.")
t("bearing_bushing", "جلبة المحمل", "Bearing bushing.", "جلبة محمل.")
t("bushing", "جلبة", "Bushing.", "جلبة.")
t("bronze_bushing", "جلبة برونز", "Bronze bushing.", "جلبة برونز.")
t("du_bushing", "جلبة DU", "DU bushing.", "جلبة DU.")
# shafts
t("cardan", "عمود كردان", "Cardan (universal-joint) drive shaft, length as in the name.", "عمود كردان (مفصل عام) بالطول المذكور في الاسم.")
t("pto_shaft", "عمود PTO", "PTO drive shaft.", "عمود نقل حركة PTO.")
t("splined_shaft", "عمود مخدّد", "Splined shaft.", "عمود مخدّد.")
t("flanged_shaft", "عمود بشفة", "Flanged shaft.", "عمود بشفة.")
t("agitator_shaft", "عمود المقلّب", "Agitator shaft for the hopper.", "عمود المقلّب في القادوس.")
t("shaft", "عمود", "Shaft.", "عمود.")
t("clutch", "قابض منزلق", "Sliding clutch.", "قابض منزلق.")
# mixer
t("mixer_shaft", "عمود الخلاط", "Mixer shaft.", "عمود خلاط.")
t("paddle", "ريشة خلط", "Mixer paddle.", "ريشة خلط.")
t("drum_roller", "بكرة ارتكاز الخلاطة", "Drum support roller for a transit mixer, complete with pin; size in the name.", "بكرة ارتكاز لدوّار خلاطة الخرسانة مع المحور، والمقاس في الاسم.")
t("nilos_cover", "غطاء حلقة نيلوس", "Nilos ring cover for the drum roller.", "غطاء حلقة نيلوس لبكرة الارتكاز.")
# hardware
t("bolt", "مسمار", "Bolt.", "مسمار (بولت).")
t("screw", "برغي", "Screw.", "برغي.")
t("nut", "صامولة", "Nut.", "صامولة.")
t("washer", "وردة", "Washer.", "وردة (واشر).")
t("tie_rod", "قضيب شد", "Tie rod.", "قضيب شد.")
t("key", "خابور", "Key.", "خابور.")
# rubber and misc
t("rubber_buffer", "مصد مطاطي", "Rubber buffer.", "مصد مطاطي.")
t("rubber_cap", "غطاء مطاطي", "Rubber cap.", "غطاء مطاطي.")
t("rubber_disc", "قرص مطاطي", "Rubber disc.", "قرص مطاطي.")
t("brush", "فرشاة", "Brush.", "فرشاة.")
t("spring", "زنبرك", "Spring.", "زنبرك.")
t("cover", "غطاء", "Cover.", "غطاء.")
t("support", "دعامة", "Support.", "دعامة.")
t("disc", "قرص", "Disc.", "قرص.")
t("plate", "صفيحة", "Plate.", "صفيحة.")
t("ring", "حلقة", "Ring.", "حلقة.")

t("lever_coupling", "وصلة بذراع", "Lever-action quick coupling for delivery pipes.", "وصلة سريعة بذراع لأنابيب الضخ.")
t("accumulator", "أكيومولاتور", "Hydraulic accumulator; the size (litres) is in the name.", "أكيومولاتور هيدروليكي (مجمّع ضغط)، والسعة باللتر مذكورة في الاسم.")
t("bladder", "كيس أكيومولاتور", "Replacement bladder for a hydraulic accumulator.", "كيس (مثانة) بديل لأكيومولاتور هيدروليكي.")
t("lever", "ذراع", "Lever.", "ذراع.")
t("charging_set", "طقم شحن الأكيومولاتور", "Gas charging set for hydraulic accumulators.", "طقم شحن غاز للأكيومولاتور الهيدروليكي.")
t("lub_distributor", "موزّع تشحيم", "Lubricant distributor for the central greasing system.", "موزّع تشحيم لنظام التشحيم المركزي.")
t("distributor_casing", "غلاف الموزّع", "Casing of the lubricant distributor.", "غلاف موزّع التشحيم.")
t("spacer", "فاصل", "Spacer.", "فاصل.")
t("junk_ring", "حلقة جنك", "Junk ring (packing retainer).", "حلقة جنك (حلقة تثبيت الحشو).")
t("head_cover", "غطاء رأس الأسطوانة", "Cylinder head cover (engine).", "غطاء رأس أسطوانة (محرك).")
t("slide", "منزلق", "Slide.", "منزلق.")
t("bock", "حامل (Bock)", "Bracket / bearing block (the manufacturer calls it a Bock).", "حامل / كرسي محمل (تسميته عند المصنّع Bock).")
t("handle", "مقبض", "Handle.", "مقبض.")
t("lid", "غطاء الصندوق", "Lid for the pump body / box.", "غطاء للصندوق.")
t("saddle", "سرج دعم", "Support saddle.", "سرج دعم.")
t("securing_plate", "صفيحة تثبيت", "Securing plate.", "صفيحة تثبيت.")
t("pressure_plate", "صفيحة ضغط", "Pressure plate.", "صفيحة ضغط.")
t("closer_cap", "غطاء قفل", "Locking cap for the hopper closer.", "غطاء قفل لمغلاق القادوس.")
t("support_cover", "غطاء دعم", "Supporting cover.", "غطاء دعم.")
t("misc", "قطعة", "", "")

# ------------------------------------------------------------------ rules: first match wins on the lower-case cleaned name.  (key, regex, category)
R = [
    ("storz_coupling", r"storz coupling", "pipes"),
    ("level_indicator", r"level indicator", "electrical"),
    ("oil_gauge", r"oil gauge", "electrical"),
    ("spectacle_plate", r"spectacle", "wear"),
    ("sponge_ball", r"sponge ball", "pipes"),
    ("cleaning_board", r"cleaning board", "pipes"),
    ("end_hose", r"holding stand end hose", "hoses"),
    ("hose_clamp", r"end hose clamp", "hoses"),
    ("end_hose", r"end hose", "hoses"),
    ("flat_hose", r"flat hose", "hoses"),
    ("hp_hose", r"high pressure hose|\bhose\b", "hoses"),
    ("seal_kit", r"seal ?kit|seal set|seal kit", "seals"),
    ("repair_kit", r"repair kit", "seals"),
    ("gasket_set", r"gasket set", "seals"),
    ("gasket", r"gasket", "seals"),
    ("o_ring", r"o[ -]ring", "seals"),
    ("lip_seal", r"lip seal", "seals"),
    ("felt_seal", r"felt seal", "seals"),
    ("backup_ring", r"back[ -]?up ring", "seals"),
    ("scraper_ring", r"scrapper ring|scraper ring", "seals"),
    ("wiper_ring", r"wiper ring", "seals"),
    ("compression_ring", r"compression ring", "seals"),
    ("guide_band", r"guid(?:e|ing) band", "seals"),
    ("guide_ring", r"guide ring", "seals"),
    ("rod_seal", r"rod seal(?:ing)?", "seals"),
    ("shaft_seal", r"shaft seal", "seals"),
    ("oil_seal", r"oil seal", "seals"),
    ("piston_seal", r"piston seal", "seals"),
    ("pu_seal", r"pu seal|yellow seal", "seals"),
    ("rubber_seal", r"rubber seal", "seals"),
    ("sealing_cover", r"seal(?:ing)? (?:supporting )?cover", "seals"),
    ("support_cover", r"supporting cover|supprting cover", "other"),
    ("seal_support", r"seal support", "seals"),
    ("round_cord", r"round cord", "seals"),
    ("sealing_ring", r"sealing ring|seal ring|\bsealing\b", "seals"),
    ("seal", r"\bseal\b|cylinder sealing", "seals"),
    ("retaining_ring", r"securing ring|safety ring", "seals"),
    # S-valve and wear parts
    ("cutting_spring", r"rubber spring|pressure spring", "wear"),
    ("cutting_ring", r"cutting ring", "wear"),
    ("wear_plate", r"wear plate|wearing plate", "wear"),
    ("thrust_ring", r"thrust ring", "wear"),
    ("wear_ring", r"wear ring", "wear"),
    ("wear_insert", r"wearing insert|wear insert", "wear"),
    ("wear_sleeve", r"wear sleeve", "wear"),
    ("wear_bush", r"wear bush", "wear"),
    ("housing_lining", r"housing lining", "wear"),
    ("upper_housing", r"upper housing", "wear"),
    ("outer_housing", r"outer housing", "wear"),
    ("discharge_support", r"discharge support", "wear"),
    ("support_flange", r"support flange", "wear"),
    ("bearing_flange", r"bearing flange|mixer bearing flange", "wear"),
    ("s_shaft_bearing", r"s shaft upper bearing", "wear"),
    ("rock_valve", r"rock valve", "wear"),
    ("s_pipe", r"\bs pipe\b", "pipes"),
    ("s_valve", r"\bs valve\b", "wear"),
    ("slewing_lever", r"slewing lever|swing lever|lever cifa for slewing", "wear"),
    ("slewing_shaft", r"slewing shaft", "wear"),
    ("compensating_ring", r"compensating ring", "wear"),
    ("intermediate_ring", r"intermediate ring", "wear"),
    ("ball_cup", r"ball cup", "wear"),
    # cylinders and pistons
    ("plunger_cyl", r"plunger cylinder|\bplunger\b", "pistons"),
    ("delivery_cyl", r"delivery cylinder|del cylinder|pumping cylinder", "pistons"),
    ("switching_cyl", r"switching cylinder", "pistons"),
    ("ram_piston", r"ram piston|piston ram", "pistons"),
    ("pu_piston", r"pu piston", "pistons"),
    ("rubber_piston", r"rubber piston", "pistons"),
    ("piston_rod", r"piston rod", "pistons"),
    ("piston_head", r"piston head", "pistons"),
    ("piston", r"piston", "pistons"),
    ("rod_eye", r"rod eye", "pistons"),
    # pipes, elbows, couplings
    ("lever_coupling", r"lever coupling", "pipes"),
    ("clamp_coupling", r"clamp coupling|clam coupling|^clamp |^clamp$", "pipes"),
    ("cup_coupling", r"cup type coupling", "pipes"),
    ("screw_coupling", r"screw coupling|screw mounting coupling", "pipes"),
    ("bolt_coupling", r"bolt type coupling", "pipes"),
    ("mount_coupling", r"mounting coupling", "pipes"),
    ("snap_coupling", r"snap coupling", "pipes"),
    ("cement_coupling", r"cement coupling", "pipes"),
    ("foldable_elbow", r"foldable elbow", "pipes"),
    ("elbow", r"elbow", "pipes"),
    ("bend", r"\bbend\b", "pipes"),
    ("tapered_pipe", r"tapered (?:pipe|tube)", "pipes"),
    ("reducer_pipe", r"reducer", "pipes"),
    ("delivery_pipe", r"delivery pipe|delivery tube", "pipes"),
    ("pipe", r"\bpipe\b", "pipes"),
    ("welding_flange", r"welding flange", "pipes"),
    ("tube_support", r"tube support", "pipes"),
    ("collar", r"collar", "pipes"),
    ("connection_piece", r"connection (?:bend|piece)", "pipes"),
    ("wedge", r"\bwedge\b", "pipes"),
    ("tightening_strap", r"tightening strap", "pipes"),
    ("u_bolt", r"u bolt", "pipes"),
    ("coupling", r"coupling", "pipes"),
    ("flange", r"flange", "pipes"),
    # valves
    ("way_valve", r"way valve", "valves"),
    ("solenoid_valve", r"solenoid valve|electro valve", "valves"),
    ("check_valve", r"check valve", "valves"),
    ("balance_valve", r"balance valve", "valves"),
    ("flow_valve", r"flow control valve", "valves"),
    ("overflow_valve", r"overflow valve", "valves"),
    ("pressure_limit_valve", r"pressure limit valve", "valves"),
    ("prop_valve", r"valve prop", "valves"),
    ("pressure_valve", r"pressure valve", "valves"),
    ("cartridge_valve", r"cartridge valve|valve cartridge", "valves"),
    ("distributor_valve", r"distributor valve", "valves"),
    ("valve_body", r"valve body", "valves"),
    ("solenoid_coil", r"solenoid coil|^solenoid", "valves"),
    ("valve", r"valve", "valves"),
    # filters, cooling
    ("air_filter", r"air filter", "filters"),
    ("filter_pump", r"filter pump", "filters"),
    ("filter_element", r"filter element", "filters"),
    ("filter", r"filter", "filters"),
    ("oil_cooler", r"oil cooler", "cooling"),
    ("fan", r"\bfan\b", "cooling"),
    ("cooler", r"cooler", "cooling"),
    # pumps and motors
    ("charge_pump", r"charge pump", "pumps"),
    ("gear_pump", r"gear pump", "pumps"),
    ("flush_pump", r"flushing water pump", "pumps"),
    ("water_pump", r"water pump", "pumps"),
    ("diesel_pump", r"diesel pump", "pumps"),
    ("hyd_pump", r"hydraulic pump|variable displacement pump|\bpump\b", "pumps"),
    ("hyd_motor", r"hydraulic motor|hyd motor", "pumps"),
    ("motor", r"\bmotor\b", "pumps"),
    # electrical
    ("limit_switch", r"limit switch", "electrical"),
    ("prox_switch", r"proximity switch", "electrical"),
    ("press_button", r"press button", "electrical"),
    ("toggle_switch", r"toggle switch", "electrical"),
    ("switch", r"switch", "electrical"),
    ("relay", r"relay", "electrical"),
    ("breaker", r"circuit breaker", "electrical"),
    ("temp_sensor", r"temp(?:erature)?\.? sensor", "electrical"),
    ("pressure_sensor", r"pressure sensor", "electrical"),
    ("sensor", r"sensor", "electrical"),
    ("transducer", r"transducer|transmitter", "electrical"),
    ("vacuum_gauge", r"vacuum gauge", "electrical"),
    ("gauge", r"pressure gauge|bar meter", "electrical"),
    ("control_box", r"control box", "electrical"),
    ("estop_box", r"emergency stop", "electrical"),
    ("charger", r"battery charger", "electrical"),
    ("battery", r"battery", "electrical"),
    ("cable", r"\bcable\b", "electrical"),
    ("plug", r"\bplug\b", "electrical"),
    ("aerial", r"aerial", "electrical"),
    # bearings
    ("agitator_bearing", r"agitator bearing", "bearings"),
    ("roller_bearing", r"roller bearing", "bearings"),
    ("bearing_bushing", r"bearing bushing", "bearings"),
    ("bronze_bushing", r"bronze bush", "bearings"),
    ("du_bushing", r"du bushing", "bearings"),
    ("bearing", r"bearing", "bearings"),
    ("bushing", r"\bbush(?:ing)?\b", "bearings"),
    # shafts
    ("cardan", r"cardan shaft", "gears"),
    ("pto_shaft", r"pto shaft", "gears"),
    ("splined_shaft", r"splined shaft", "gears"),
    ("flanged_shaft", r"flanged shaft", "gears"),
    ("agitator_shaft", r"agitator shaft", "gears"),
    ("clutch", r"clutch", "gears"),
    ("mixer_shaft", r"mixer shaft", "mixer"),
    ("paddle", r"paddle", "mixer"),
    ("nilos_cover", r"nilos ring cover|nilos ring", "mixer"),
    ("drum_roller", r"drum roller", "mixer"),
    ("shaft", r"shaft", "gears"),
    # hardware
    ("tie_rod", r"tie rod", "hardware"),
    ("screw", r"screw", "hardware"),
    ("nut", r"\bnut\b", "hardware"),
    ("washer", r"washer", "hardware"),
    ("bolt", r"\bbolt\b", "hardware"),
    ("key", r"^key$", "hardware"),
    # rubber, misc
    ("rubber_buffer", r"rubber buffer", "rubber"),
    ("rubber_cap", r"rubber cap", "rubber"),
    ("rubber_disc", r"rubber disc", "rubber"),
    ("brush", r"brush", "rubber"),
    ("saddle", r"support saddle", "other"),
    ("securing_plate", r"securing plate", "other"),
    ("pressure_plate", r"pressure plate", "other"),
    ("junk_ring", r"junk ring", "other"),
    ("head_cover", r"engine head cover", "other"),
    ("distributor_casing", r"distributor casing", "other"),
    ("lub_distributor", r"lubricant distributor", "other"),
    ("closer_cap", r"locking cap", "other"),
    ("charging_set", r"charging set", "other"),
    ("accumulator", r"accumulator", "other"),
    ("bladder", r"bladder", "other"),
    ("bock", r"\bbock\b", "other"),
    ("lid", r"trunk lid", "other"),
    ("spacer", r"spacer", "other"),
    ("handle", r"handle", "other"),
    ("slide", r"^slide\b", "other"),
    ("lever", r"\blever\b", "other"),
    ("spring", r"spring", "other"),
    ("cover", r"\bcover\b", "other"),
    ("support", r"\bsupport\b|torque support", "other"),
    ("disc", r"\bdisc\b|setting disc", "other"),
    ("plate", r"\bplate\b", "other"),
    ("ring", r"\bring\b", "other"),
]
RULES = [(k, re.compile(rx), c) for k, rx, c in R]

# modifiers that appear in names -> Arabic
MOD = {
    "left": "يسار", "right": "يمين", "open": "مفتوح", "closed": "مغلق", "single": "مفرد", "double": "مزدوج", "long": "طويل", "short": "قصير",
    "big": "كبير", "small": "صغير", "twin": "مزدوج", "wall": "الجدار", "black": "أسود", "brown": "بني", "red": "أحمر", "orange": "برتقالي",
    "yellow": "أصفر", "white": "أبيض", "green": "أخضر", "dark": "داكن", "gray": "رمادي", "light": "فاتح", "original": "أصلي", "normal": "عادي",
    "complete": "كامل", "male": "ذكر", "female": "أنثى", "with": "مع", "without": "بدون", "casting": "صب", "forging": "حدادة", "first": "أول",
    "second": "ثاني", "mixer": "خلاطة", "pump": "مضخة", "boom": "ذراع", "hopper": "قادوس", "layer": "طبقة", "thick": "سماكة", "inch": "إنش", "deg": "درجة",
    "degree": "درجة", "mtr": "متر", "mm": "مم", "cm": "سم", "ltr": "لتر", "extension": "تمديد", "hard": "قاسٍ", "medium": "متوسط", "pcs": "قطعة",
    "type": "نوع", "support": "دعامة", "housing": "غلاف", "cylinder": "أسطوانة", "assembly": "تجميعة", "set": "طقم", "kit": "طقم", "hydraulic": "هيدروليكي",
    "motor": "محرك", "pump": "مضخة", "valve": "صمام", "ring": "حلقة", "flange": "شفة", "wear": "تآكل", "plate": "لوحة", "shaft": "عمود", "bearing": "محمل",
    "taiwan": "تايوان", "ergonic": "إرجونيك", "double layer": "طبقتين", "grooved": "مخدّد", "water": "مياه", "oil": "زيت", "plastic": "بلاستيك", "sleeve": "كم",
    "electric": "كهربائي", "elect": "كهربائي", "fork": "شوكة", "handle": "مقبض", "stand": "حامل", "head": "رأس", "rod": "ساق", "ball": "كرة",
}

MOD.update({
    "storz": "ستورز", "nilos": "نيلوس", "triple": "ثلاثي", "discharge": "التفريغ", "thrust": "الدفع", "assy": "تجميعة", "end": "نهاية",
    "wedge": "إسفين", "spacer": "فاصل", "cutting": "قطع", "safety": "أمان", "rubber": "مطاط", "connection": "توصيل", "medium": "متوسط",
    "hex": "سداسي", "hexagonal": "سداسي", "cap": "رأس", "mech": "ميكانيكي", "magn": "مغناطيسي", "axial": "محوري", "bottom": "سفلي", "upper": "علوي",
    "outer": "خارجي", "lower": "سفلي", "inner": "داخلي", "side": "جانبي", "outlet": "مخرج", "inlet": "مدخل", "steel": "فولاذ", "strip": "شريط",
    "polyproplene": "بولي بروبيلين", "polypropylene": "بولي بروبيلين", "poly": "بولي", "replacement": "بديل", "sweeper": "كنّاسة", "machine": "آلة",
    "truck": "شاحنة", "concrete": "خرسانة", "unit": "وحدة", "star": "نجمي", "temp": "حرارة", "pressure": "ضغط", "tension": "شد", "plain": "سادة",
    "super": "سوبر", "round": "دائري", "stirrup": "رباط", "threaded": "مسنّن", "fitting": "تركيب", "and": "و", "second": "الثاني", "1st": "الأول",
    "first": "الأول", "reduction": "تخفيض", "connection": "توصيل", "bend": "منحنى", "tapered": "مخروطي", "elbow": "كوع", "pipe": "أنبوب", "hose": "خرطوم",
    "bolt": "مسمار", "coupling": "وصلة", "cooler": "مبرّد", "gear": "تروس", "plunger": "غاطس", "lock": "قفل", "locking": "قفل", "sliding": "منزلق",
    "bushing": "جلبة", "bronze": "برونز", "cut": "Cut", "ext": "تمديد", "length": "الطول", "thick": "السماكة", "dbl": "مزدوج", "distributor": "موزّع",
    "level": "مستوى", "indicator": "مؤشر", "engine": "محرك", "delivery": "ضخ", "socket": "مقبس", "coil": "ملف", "guide": "توجيه", "washer": "وردة",
    "seal": "ختم", "ring": "حلقة", "sealing": "ختم", "cover": "غطاء", "casing": "غلاف", "switch": "مفتاح", "change": "تبديل", "over": "",
    "best": "", "in": "", "for": "", "made": "صناعة", "germany": "ألمانيا", "duro": "Duro", "foot": "قدم (Foot)", "throat": "حلق (Throat)", "bench": "Bench",
    "neck": "رقبة", "multiple": "متعدد", "sys": "نظام", "leaf": "ريش", "holes": "فتحات", "rhs": "يمين", "lhs": "يسار", "wrench": "مفتاح ربط", "bracket": "حامل",
    "mounting": "تركيب", "inch": "إنش", "l/min": "لتر/د", "degree": "درجة", "deg": "درجة", "auroral": "Auroral", "celandar": "Celandar", "akku": "(Akku)",
    "cheese": "رأس أسطواني", "shawel": "Shawel", "mechanic": "ميكانيكي", "chute": "مزلق", "trunk": "صندوق", "lid": "غطاء", "closer": "مغلاق", "swing": "دوّار",
    "charging": "شحن", "lubricant": "تشحيم", "oring": "حلقة O", "step": "خطوة", "bar": "بار", "plug": "قابس", "dark": "داكن", "gray": "رمادي", "grey": "رمادي",
})
FEM_ADJ = {"ثلاثي": "ثلاثية", "مفتوح": "مفتوحة", "مغلق": "مغلقة", "مفرد": "مفردة", "مزدوج": "مزدوجة", "طويل": "طويلة", "قصير": "قصيرة", "كبير": "كبيرة", "صغير": "صغيرة",
           "أسود": "سوداء", "أحمر": "حمراء", "أخضر": "خضراء", "أصفر": "صفراء", "أبيض": "بيضاء", "بني": "بنية", "برتقالي": "برتقالية", "رمادي": "رمادية",
           "أصلي": "أصلية", "كامل": "كاملة", "سداسي": "سداسية", "عادي": "عادية", "داكن": "داكنة", "فاتح": "فاتحة", "علوي": "علوية", "سفلي": "سفلية",
           "خارجي": "خارجية", "داخلي": "داخلية", "جانبي": "جانبية", "مخروطي": "مخروطية", "محوري": "محورية", "سادة": "سادة", "ميكانيكي": "ميكانيكية",
           "مغناطيسي": "مغناطيسية", "ذاتي القفل": "ذاتية القفل", "الأول": "الأولى", "الثاني": "الثانية"}
# multi-word phrases on the lower-case remainder: regex -> (masculine, feminine); \1 allowed
PHRASES = [
    (r"hydraulic motor", "لمحرك هيدروليكي", "لمحرك هيدروليكي"), (r"hydraulic pump", "لمضخة هيدروليكية", "لمضخة هيدروليكية"),
    (r"thrust ring", "حلقة الدفع", "حلقة الدفع"), (r"discharge support", "دعامة التفريغ", "دعامة التفريغ"), (r"for drum roller", "لبكرة الارتكاز", "لبكرة الارتكاز"),
    (r"assy|assembly", "تجميعة", "تجميعة"),
    (r"hex head cap", "رأس سداسي", "رأس سداسي"), (r"cheese head", "رأس أسطواني", "رأس أسطواني"), (r"head cap", "رأس سداسي مجوّف (ألن)", "رأس سداسي مجوّف (ألن)"),
    (r"self[ -]lock", "ذاتي القفل", "ذاتية القفل"), (r"dark gr[ae]y", "رمادي داكن", "رمادية داكنة"), (r"multiple in sys", "نظام توصيل متعدد", "نظام توصيل متعدد"),
    (r"made in germany", "صناعة ألمانية", "صناعة ألمانية"), (r"change over", "تبديل", "تبديل"), (r"star handle", "بمقبض نجمي", "بمقبض نجمي"),
    (r"(\d+) leaf", r"\1 ريش", r"\1 ريش"), (r"(\d+) holes", r"\1 فتحات", r"\1 فتحات"), (r"gear ?box", "علبة التروس", "علبة التروس"),
    (r"1st and second", "الأول والثاني", "الأول والثاني"), (r"without steel", "بدون فولاذ", "بدون فولاذ"),
    (r"with (\d+)(mm|cm)? ext", r"مع تمديد \1 مم", r"مع تمديد \1 مم"),
]
STOP = {"the", "of", "a", "kit,"}


def clean_en(raw: str) -> str:
    s = re.sub(r"\s+", " ", str(raw).upper().replace("&AMP;", "&")).strip()
    for rx, rep in TYPOS:
        s = re.sub(rx, rep, s)
    return re.sub(r"\s+", " ", s).strip(" -/")


def title(s: str) -> str:
    out = []
    for w in s.split(" "):
        base = re.sub(r"[^A-Z0-9]", "", w)
        if base in BRAND_CASE:
            out.append(re.sub(re.escape(base), BRAND_CASE[base], w, count=1))
        elif any(c.isdigit() for c in w) or base in KEEP_UPPER or (len(base) == 1 and base.isalpha()):
            out.append(w)
        else:
            out.append("-".join(x.capitalize() for x in w.split("-")) if w.isalpha() or "-" in w or "/" not in w else w.capitalize())
    return " ".join(out)


def detect_brands(code_brand: str, low: str):
    b = list(CODE_BRAND.get((code_brand or "").strip().upper(), []))
    for slug, rx in NAME_BRAND:
        if re.search(rx, low) and slug not in b:
            b.append(slug)
    return b


def main(xlsx: str):
    wb = openpyxl.load_workbook(xlsx)
    ws = wb.active
    hr = next(r for r in range(1, 20) if str(ws.cell(r, 2).value or "").strip().upper() == "PART CODE")
    imgs = {}
    for im in ws._images:
        row = im.anchor._from.row + 1
        if row not in imgs:
            imgs[row] = im._data()
    (ROOT / "public" / "products").mkdir(parents=True, exist_ok=True)

    old = [p for p in json.loads((ROOT / "data" / "products.json").read_text(encoding="utf-8")) if not p["code"].startswith("201010-")]
    # keep the old pipe-type items together with the new "pipes" category
    pipe_rx = re.compile(r"pipe|elbow|flange|tapered|clamp|nipple|manifold|coupling")
    for p in old:
        if p["cat"] == "hoses" and pipe_rx.search(p["name"].lower()) and "hose" not in p["name"].lower():
            p["cat"] = "pipes"

    new, review = [], []
    for r in range(hr + 1, ws.max_row + 1):
        code, raw = ws.cell(r, 2).value, ws.cell(r, 3).value
        if not code or not raw:
            continue
        code = str(code).strip()
        ar_old = str(ws.cell(r, 4).value or "").strip()
        bcode = str(ws.cell(r, 11).value or "").strip()

        name = clean_en(raw)
        # OEM / reference number: a 6+ digit token in the English name, else in the sheet's Arabic text
        ref = None
        for tok in re.findall(r"(?<![\d.])\d{6,9}(?![\d.])", name):
            ref = tok
            name = re.sub(r"(?<![\d.])" + tok + r"(?![\d.])", " ", name, count=1)
            break
        if not ref:
            m = re.search(r"(?<![\d.])\d{6,9}(?![\d.])", ar_old)
            ref = m.group(0) if m else None
        name = re.sub(r"\s+", " ", name).strip(" -/")
        low = name.lower()

        key, cat = "misc", "other"
        for k, rx, c in RULES:
            if rx.search(low):
                key, cat = k, c
                break
        if re.match(r"\d", low):
            for k, rx, c in RULES:
                if k == key:
                    mm = rx.search(low)
                    if mm and mm.start() > 0:
                        name = title(mm.group(0)) + " " + re.sub(r"\s+", " ", (low[:mm.start()] + " " + low[mm.end():]).upper()).strip()
                        low = name.lower()
                    break
        brands = detect_brands(bcode, low)

        # --- English display name
        en = title(name)
        if len(brands) == 1 and BRANDS[brands[0]][0].lower() not in low:
            en = f"{en} – {BRANDS[brands[0]][0]}"

        # --- Arabic name: part type + the spec tokens of the English name + brand
        g = G[key]
        rest = low
        for k, rx, c in RULES:
            if k == key:
                rest = rx.sub(" ", rest, count=1)
                break
        for slug, rx in NAME_BRAND:
            rest = re.sub(rx, " ", rest)
        fem = g["ar"].split()[0].endswith("ة")
        pieces = []  # (text, is_adjective_pair)
        marks = {}

        def keep(m, mas, fe):
            marks[len(marks)] = (m.expand(mas), m.expand(fe))
            return f" \u27e6{len(marks) - 1}\u27e7 "

        for rx, mas, fe in PHRASES:
            rest = re.sub(rx, lambda m, mas=mas, fe=fe: keep(m, mas, fe), rest)
        rest = re.sub(r"(\d+(?:\.\d+)?)\s*(mm|cm|mtr|ltr|deg|degree)\b", lambda m: f"{m.group(1)} {MOD[m.group(2)]}", rest)
        toks = []
        for tk in rest.split():
            tk = tk.strip(",;(){}/")
            if not tk or tk in STOP:
                continue
            if re.search("[\u0600-\u06ff]", tk):
                toks.append(tk)
                continue
            mk = re.fullmatch("\u27e6(\\d+)\u27e7", tk)
            if mk:
                mas, fe = marks[int(mk.group(1))]
                toks.append(fe if fem else mas)
            elif tk in MOD:
                w = MOD[tk]
                if w:
                    toks.append(FEM_ADJ.get(w, w) if fem else w)
            elif any(c.isdigit() for c in tk) or len(tk) <= 3 or tk.upper() in KEEP_UPPER:
                toks.append(tk.upper())
            elif tk.upper() in BRAND_CASE:
                toks.append(BRAND_CASE[tk.upper()])
            else:
                toks.append(tk.capitalize())
                review.append(f"LATIN-IN-ARABIC {code}: '{tk}'  ({en})")
        ar = " ".join([g["ar"]] + toks).strip()
        if len(brands) == 1:
            ar = f"{ar} \u2013 {BRANDS[brands[0]][1]}"

        # --- description (type description, plus the brand when the sheet names one)
        de, da = g["de"], g["da"]
        if de and len(brands) == 1:
            de += f" For {BRANDS[brands[0]][0]} concrete pumps."
            da += f" لمضخات الخرسانة من {BRANDS[brands[0]][1]}."

        p = dict(code=code, name=en, nameAr=ar, cat=cat, tags=brands, image=None, descAr=da or None, descEn=de or None, ref=ref, indexable=False)
        # --- photo exactly as embedded (no resize, no re-encode)
        if r in imgs:
            try:
                im = Image.open(io.BytesIO(imgs[r]))
                ext = {"JPEG": "jpg", "PNG": "png", "GIF": "gif", "WEBP": "webp"}.get(im.format, "png")
                (ROOT / "public" / "products" / f"{code}.{ext}").write_bytes(imgs[r])
                p["image"] = f"/products/{code}.{ext}"
                p["iw"], p["ih"] = im.size
            except Exception as e:  # noqa: BLE001
                review.append(f"{code}: image failed ({e})")
        p["indexable"] = bool(p["image"] and p["descEn"])
        if key == "misc":
            review.append(f"UNCLASSIFIED {code}  {raw}")
        new.append(p)

    seen = {}
    for p in new:
        seen.setdefault(p["name"], []).append(p)
    for nm, grp in seen.items():
        if len(grp) > 1:
            for p in grp:
                if p["ref"]:
                    p["name"] += f" ({p['ref']})"
                    p["nameAr"] += f" ({p['ref']})"
    merged = new + old
    (ROOT / "data" / "products.json").write_text(json.dumps(merged, ensure_ascii=False, indent=0), encoding="utf-8")
    counts = {}
    for p in merged:
        counts[p["cat"]] = counts.get(p["cat"], 0) + 1
    head = [f"Parts: {len(merged)} (new {len(new)} + existing {len(old)})  | with image: {sum(1 for p in merged if p['image'])}  | indexable: {sum(p['indexable'] for p in merged)}",
            "Per category: " + ", ".join(f"{k}={v}" for k, v in sorted(counts.items(), key=lambda x: -x[1])), ""]
    (ROOT / "data" / "review.txt").write_text("\n".join(head + review), encoding="utf-8")
    print("\n".join(head), "\n", len(review), "review lines")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    main(sys.argv[1])
