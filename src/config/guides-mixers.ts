import type { Guide, L } from "./guides";

// Blog articles, cluster "mixers": truck mixers and batching plants. Same rules as guides-pumps.ts:
// general technical knowledge or facts already on the site only; no intervals, prices, warranty or "genuine" claims.

const l = (ar: string, en: string): L => ({ ar, en });
const DATE = "2026-11-17";

export const MIXER_GUIDES: Guide[] = [
  /* ---------------------------------------------------- drum rollers */
  {
    slug: "truck-mixer-drum-rollers",
    date: DATE,
    cluster: "mixers",
    title: l(
      "رولات درام الخلاطة والرولمان: متى تُستبدل وكيف تحدد المقاس",
      "Truck Mixer Drum Rollers and Bearings: When to Replace and How to Find the Size",
    ),
    desc: l(
      "علامات تلف رولات درام شاحنة الخلاطة وكيف تقيس الرول القديم وتطلب البديل، مع دور الرولمان والمحرك الهيدروليكي في دوران الدرام.",
      "Signs that a truck mixer's drum rollers are worn, how to measure the old roller and order a replacement, and the role of the bearings and hydraulic motor in turning the drum.",
    ),
    answer: l(
      "درام شاحنة الخلاطة يدور فوق رولات دعم، وتتآكل مع الوقت أو تتلف محاملها. من العلامات: صوت احتكاك أو اهتزاز أثناء دوران الدرام، أو سطح رول متآكل أو لا يدور. اطلب الرول بمقاساته الثلاثة المكتوبة في اسمه، وأرسل صورة الرول القديم مع الدبوس.",
      "A truck mixer's drum turns on support rollers, and they wear or their bearings fail over time. Signs include a grinding noise or vibration while the drum turns, or a roller with a worn or seized surface. Order the roller by the three measurements in its name, and send a photo of the old roller with its pin.",
    ),
    intro: l(
      "الرولات من القطع التي لا ينتبه لها أحد حتى يبدأ الدرام بإصدار صوت. هذا الدليل يساعدك على اكتشاف التلف مبكرًا وعلى طلب المقاس الصحيح من أول مرة.",
      "Rollers are the parts nobody notices until the drum starts to make a noise. This guide helps you spot wear early and order the right size the first time.",
    ),
    sections: [
      {
        h: l("ما وظيفة رولات الدرام", "What the drum rollers do"),
        body: [
          {
            p: l(
              "الرولات تحمل الدرام أثناء دورانه، وهي قطع تحتك بحلقة الدرام وتتحمّل حمل الخرسانة الثقيل كل يوم. الكتالوج يعرضها باسم «Drum Roller» بمقاسات في الاسم، وبعضها يأتي كاملًا مع الدبوس (With Pin). تجدها في قسم [قطع الخلاطات والمحطات](/category/mixer/).",
              "The rollers carry the drum while it turns. They rub against the drum's track and take the heavy concrete load every day. The catalogue lists them as “Drum Roller” with measurements in the name, and some come complete with the pin (With Pin). You will find them under [mixer and batching-plant parts](/category/mixer/).",
            ),
          },
        ],
      },
      {
        h: l("علامات التلف", "Signs of wear"),
        body: [
          {
            ul: [
              l("صوت احتكاك أو طقطقة أثناء دوران الدرام.", "A grinding or knocking noise while the drum turns."),
              l("اهتزاز غير معتاد في الدرام أو الهيكل.", "Unusual vibration in the drum or frame."),
              l("رول لا يدور بحرّية، أو عليه سطح مسطّح أو متآكل بشكل غير متساوٍ.", "A roller that does not turn freely, or has a flat spot or uneven wear."),
              l("تسرّب شحم أو آثار حرارة عند الرول.", "Grease leaking or signs of heat at the roller."),
            ],
          },
          {
            note: l(
              "إذا أُهملت هذه العلامات فقد يتلف الرول المجاور أو حلقة الدرام، وهذا أغلى بكثير من استبدال رول.",
              "If these signs are ignored, the neighbouring roller or the drum track can be damaged, which costs far more than replacing a roller.",
            ),
          },
        ],
      },
      {
        h: l("كيف تحدد المقاس", "How to find the size"),
        body: [
          {
            table: {
              head: [l("ما ترسله", "What to send"), l("لماذا", "Why")],
              rows: [
                [l("صورة الرول القديم والدبوس", "A photo of the old roller and its pin"), l("تُظهر الشكل وطريقة التثبيت وهل الرول يأتي كاملًا أم مع الرولمان.", "Shows the shape, the fixing method and whether the roller comes complete or with its bearing.")],
                [l("ثلاثة مقاسات بالملّيمتر", "Three measurements in millimetres"), l("الاسم في الكتالوج يحمل ثلاثة أرقام، مثل «Drum Roller 280X110X50». قِس الرول القديم بالطريقة نفسها وأرسل الأرقام لنؤكد لك أي رقم يقابل أي بُعد.", "The catalogue name carries three numbers, such as “Drum Roller 280X110X50”. Measure the old roller the same way and send the numbers, and we confirm which number matches which dimension.")],
                [l("ماركة الخلاطة وموديلها وسنة الصنع", "Mixer make, model and year"), l("للتأكد من المطابقة قبل الطلب.", "To confirm the match before you order.")],
                [l("العدد المطلوب", "The quantity"), l("رول واحد أم أكثر. الرولات غالبًا تُستبدل بشكل زوجي حتى يبقى التآكل متساويًا، لكن افحص كل رول.", "One roller or more. Rollers are often replaced in pairs so wear stays even, but inspect each one.")],
              ],
            },
          },
          {
            p: l(
              "راجع أيضًا [كيف تعرف رقم قطعة الغيار](/guides/find-part-number/) و[كيف تطلب](/guides/how-to-order/).",
              "See also [how to find the part number](/guides/find-part-number/) and [how to order](/guides/how-to-order/).",
            ),
          },
        ],
      },
      {
        h: l("الرولمان والمحرك الهيدروليكي", "Bearings and the hydraulic motor"),
        body: [
          {
            p: l(
              "رقم الرولمان مطبوع على حلقته، وتجد المحامل في قسم [المحامل (رولمان)](/category/bearings/). وإذا كان الدرام بطيئًا أو الصوت من جهة الإدارة فقد يكون السبب في المحرك أو المضخة الهيدروليكية لا في الرولات. في الكتالوج رموز مثل A2FM80 وA4VTG90 المستعملة في تدوير الخلاطات، وشرحها في [رموز المضخات والمحركات الهيدروليكية](/guides/hydraulic-pump-motor-codes/).",
              "The bearing number is printed on its ring, and bearings are under [bearings](/category/bearings/). If the drum is slow or the noise comes from the drive end, the cause may be the hydraulic motor or pump rather than the rollers. The catalogue has codes such as A2FM80 and A4VTG90 used in mixer drives, explained in [hydraulic pump and motor codes](/guides/hydraulic-pump-motor-codes/).",
            ),
          },
        ],
      },
    ],
    codes: ["201010-287", "201010-288", "201010-289", "201010-290", "201010-291", "201010-511"],
    cats: ["mixer", "bearings", "pumps"],
    faq: [
      { q: l("هل أستبدل الرولين معًا؟", "Should I replace both rollers together?"), a: l("غالبًا يُفضَّل ذلك حتى يبقى التآكل متساويًا، لكن افحص كل رول، وأرسل صورًا للاثنين لنحدد ما يلزم.", "Often it is better, so wear stays even, but inspect each roller and send photos of both so we identify what you need.") },
      { q: l("هل أستبدل الرولمان فقط؟", "Can I replace only the bearing?"), a: l("يعتمد على تصميم الرول. بعض الرولات تُباع كاملة مع الدبوس. أرسل صورة الرول وسنقول لك الخيار المتاح.", "It depends on the roller's design. Some rollers are sold complete with the pin. Send a photo and we tell you the available option.") },
      { q: l("ماذا تعني الأرقام الثلاثة في اسم الرول؟", "What do the three numbers in the roller name mean?"), a: l("هي مقاسات بالملّيمتر. قِس الرول القديم بالمقاسات الثلاثة وأرسلها، فنؤكد لك أي رقم يقابل أي بُعد قبل الطلب.", "They are measurements in millimetres. Measure the old roller in all three and send them, and we confirm which number matches which dimension before you order.") },
      { q: l("هل توفّرون رولات لكل ماركات الخلاطات؟", "Do you supply rollers for every mixer make?"), a: l("لا نعد بذلك. أرسل ماركة الخلاطة وموديلها وصورة الرول وسنرد بما هو متوفر لدينا.", "We do not promise that. Send the mixer make and model and a photo of the roller and we reply with what we have.") },
    ],
  },

  /* ------------------------------------------------ batching plant */
  {
    slug: "batching-plant-spare-parts",
    date: DATE,
    cluster: "mixers",
    title: l(
      "قطع غيار محطات الخلط الخرسانية: ما الذي يتآكل وكيف تطلبه",
      "Concrete Batching Plant Spare Parts: What Wears Out and How to Order",
    ),
    desc: l(
      "أبرز قطع محطة الخلط الخرسانية التي تتآكل أو تتعطل: الخلاط، السيور والرولات، حساسات الوزن، الصمامات، هزّازات السايلو، مع طريقة طلب القطعة.",
      "The main batching plant parts that wear or fail: the mixer, belts and rollers, weighing sensors, valves and silo vibrators, with how to order the right part.",
    ),
    answer: l(
      "في محطة الخلط الخرسانية تتآكل أو تتعطل عادةً قطع الخلاط (الأذرع والشفرات)، وسيور الناقل ودرافيله، وحساسات الوزن، وصمامات الإسمنت والهواء، وهزّازات السايلو، والمحامل والليمت سويتش. اطلب القطعة بماركة المحطة وموديلها ورقم القطعة أو صورتها.",
      "On a concrete batching plant the parts that usually wear or fail are the mixer's arms and blades, the conveyor belts and rollers, the weighing sensors, the cement and air valves, the silo vibrators, and the bearings and limit switches. Order a part with the plant's make and model and the part number or a photo.",
    ),
    intro: l(
      "محطة الخلط تعمل في الغبار والإسمنت، فبعض قطعها تتآكل بحكم عملها. هذا الدليل يرتّب هذه القطع ويدلّك على أقسام الكتالوج المناسبة.",
      "A batching plant works in dust and cement, so some of its parts wear by design. This guide lists them and points you to the right catalogue sections.",
    ),
    sections: [
      {
        h: l("أين تتآكل المحطة", "Where a plant wears"),
        body: [
          {
            table: {
              head: [l("منطقة المحطة", "Area of the plant"), l("ما يتآكل أو يتعطل", "What wears or fails"), l("في الكتالوج", "In the catalogue")],
              rows: [
                [l("الخلاط", "The mixer"), l("الأذرع والشفرات والبطانات، لأن الركام يحتكّ بها.", "Arms, blades and liners, because the aggregate rubs against them."), l("[قطع الخلاطات والمحطات](/category/mixer/) و[سيكوما](/machines/sicoma/)", "[Mixer and batching-plant parts](/category/mixer/) and [Sicoma](/machines/sicoma/)")],
                [l("السيور والناقلات", "Belts and conveyors"), l("السيور والرولات والبكرات والسلاسل.", "Belts, rollers, idlers and chains."), l("[السلاسل والسيور والبكرات](/category/chains/)", "[Chains, belts and rollers](/category/chains/)")],
                [l("الوزن", "Weighing"), l("حساسات الوزن (Load cells) والكابلات.", "Load cells and their cables."), l("[الكهرباء والعدادات والتحكم](/category/electrical/)", "[Electrical, meters and controls](/category/electrical/)")],
                [l("الإسمنت والماء والهواء", "Cement, water and air"), l("صمامات الفراشة والمشغّلات.", "Butterfly valves and actuators."), l("[الصمامات والمشغّلات](/category/valves/)", "[Valves and actuators](/category/valves/)")],
                [l("السايلو والقواديس", "Silos and hoppers"), l("هزّازات تمنع انسداد التفريغ.", "Vibrators that stop discharge blockages."), l("[الهزّازات الصناعية](/category/vibrators/) و[أولي](/machines/oli/)", "[Industrial vibrators](/category/vibrators/) and [OLI](/machines/oli/)")],
                [l("الإدارة والتحكم", "Drives and controls"), l("المحامل والتروس والليمت سويتش.", "Bearings, gears and limit switches."), l("[المحامل](/category/bearings/) و[التروس](/category/gears/)", "[Bearings](/category/bearings/) and [gears](/category/gears/)")],
              ],
            },
          },
        ],
      },
      {
        h: l("ماذا تحتاج لطلب قطعة للمحطة", "What you need to order a plant part"),
        body: [
          {
            ul: [
              l("ماركة المحطة أو الخلاط وموديله وسنة الصنع، من لوحة البيانات.", "The plant or mixer make, model and year, from the data plate."),
              l("اسم القطعة وموضعها، وصورتان من زاويتين.", "The part name and where it sits, and two photos from different angles."),
              l("للهزّازات الكهربائية: صورة لوحة المحرك (الجهد والقدرة والسرعة) لأن القطعة تُطابَق بها.", "For electric vibrators: a photo of the motor plate (voltage, power and speed), because the part is matched by it."),
              l("للسيور والرولات: العرض والطول والمقاس بالملّيمتر.", "For belts and rollers: width, length and the size in millimetres."),
            ],
          },
          {
            p: l(
              "الخطوات التفصيلية في [كيف تعرف رقم قطعة الغيار](/guides/find-part-number/).",
              "The detailed steps are in [how to find the part number](/guides/find-part-number/).",
            ),
          },
        ],
      },
      {
        h: l("صيانة وقائية للمحطة", "Preventive checks on a plant"),
        body: [
          {
            ul: [
              l("افحص السيور والرولات بحثًا عن تآكل أو خروج عن المحور.", "Inspect belts and rollers for wear or misalignment."),
              l("تحقق من دقّة الوزن بأوزان معروفة حسب إجراءات المحطة، لأن حساس وزن متدهور يعطي خلطة خطأ.", "Check weighing accuracy against known weights as the plant's procedure says, because a drifting load cell gives a wrong mix."),
              l("افحص تثبيت الهزّازات والمسامير والكابلات.", "Check the vibrators' mounting, bolts and cables."),
              l("اغسل الخلاط جيدًا بعد الاستعمال كي لا تتصلّب الخرسانة.", "Wash the mixer thoroughly after use so concrete does not set."),
            ],
          },
          {
            note: l(
              "ليست كل قطع المحطات معروضة مع صور في الكتالوج. إذا لم تجد قطعتك فأرسل صورتها على واتساب ونرد عليك بما هو متوفر، كما في [كيف تطلب](/guides/how-to-order/).",
              "Not every plant part is shown with a photo in the catalogue. If you do not find yours, send a photo on WhatsApp and we reply with what is available, as in [how to order](/guides/how-to-order/).",
            ),
          },
        ],
      },
    ],
    codes: [],
    cats: ["mixer", "chains", "electrical", "valves", "vibrators", "bearings"],
    faq: [
      { q: l("ما أكثر قطع المحطة تعرّضًا للتآكل؟", "Which plant parts wear the most?"), a: l("أذرع الخلاط وشفراته وبطاناته، والسيور والرولات، لأنها تحتكّ بالركام والإسمنت يوميًا.", "The mixer's arms, blades and liners, and the belts and rollers, because they rub against aggregate and cement every day.") },
      { q: l("ماذا أرسل لطلب هزّاز كهربائي؟", "What do I send to order an electric vibrator?"), a: l("صورة لوحة المحرك فيها الجهد والقدرة والسرعة، وصورة للهزّاز ومكان تثبيته، فتُطابَق القطعة بها.", "A photo of the motor plate with its voltage, power and speed, and a photo of the vibrator and where it is mounted, and the part is matched by them.") },
      { q: l("هل توفّرون قطع سيكوما؟", "Do you supply Sicoma parts?"), a: l("الكتالوج يضم قطعًا مرتبطة بسيكوما في صفحة الماركة. أرسل موديل الخلاط وصورة القطعة لنؤكد التوفر.", "The catalogue has Sicoma-related parts on the brand page. Send the mixer model and a photo of the part and we confirm availability.") },
      { q: l("لماذا يهمّ فحص حساسات الوزن؟", "Why does checking the load cells matter?"), a: l("لأن حساسًا غير دقيق يغيّر كمية الإسمنت والركام، فتخرج خلطة غير مطابقة للتصميم.", "Because an inaccurate sensor changes the amount of cement and aggregate, so the mix comes out different from the design.") },
    ],
  },
];
