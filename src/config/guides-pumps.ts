import type { Guide, L } from "./guides";

// Blog articles, cluster "pumps": concrete pump parts, faults and maintenance.
// Rules for every article here (same as guides.ts): general technical knowledge or facts already on the site only.
// No intervals in hours, no temperatures or pressures, no prices, no warranty, no "genuine" claims.
// Text may carry [label](/path/) links; the path is site-relative. Each Arabic string is followed by its English version.

const l = (ar: string, en: string): L => ({ ar, en });
const DATE = "2026-11-17";

export const PUMP_GUIDES: Guide[] = [
  /* -------------------------------------------------------------- names */
  {
    slug: "concrete-pump-parts-names",
    date: DATE,
    cluster: "pumps",
    title: l(
      "أجزاء مضخة الخرسانة وأسماؤها بالعربية والإنجليزية: دليل مبسّط",
      "Concrete Pump Parts and Their Names in Arabic and English: A Plain Glossary",
    ),
    desc: l(
      "أسماء أجزاء مضخة الخرسانة بالعربية والإنجليزية: القادوس، المقلّب، صمام S، لوحة النظارة، حلقة القطع، أسطوانات الضخ، المبرّد، مع وظيفة كل جزء.",
      "Names of concrete pump parts in Arabic and English: hopper, agitator, S-valve, spectacle plate, cutting ring, delivery cylinders and cooler, with what each part does.",
    ),
    answer: l(
      "مضخة الخرسانة المكبسية تتكوّن من قادوس يستقبل الخرسانة، ومقلّب يحرّكها، وأسطوانتَي ضخ بمكبسَين، وصمام S ينقل الخرسانة إلى خط الضخ، ولوحة نظارة وحلقة قطع يحدث عندهما أكثر التآكل، ونظام هيدروليكي (مضخة ومحرك ومبرّد وفلاتر) يشغّل كل ذلك.",
      "A piston concrete pump has a hopper that receives the concrete, an agitator that keeps it moving, two delivery cylinders with pistons, an S-valve that passes the concrete to the delivery line, a spectacle plate and cutting ring where most wear happens, and a hydraulic system (pump, motor, cooler and filters) that drives it all.",
    ),
    intro: l(
      "حين تتصل بمورّد قطع غيار ويسألك «أي قطعة؟» تحتاج أن تعرف اسمها. هذا الدليل يجمع أسماء الأجزاء بالعربية والإنجليزية، لأن كتالوجات الشركات بالإنجليزية بينما الورش تتكلم بالعربية.",
      "When you call a parts supplier and they ask “which part?”, you need to know its name. This glossary gives the part names in Arabic and English, because maker catalogues are in English while workshops speak Arabic.",
    ),
    sections: [
      {
        h: l("مسار الخرسانة: من القادوس إلى خط الضخ", "The concrete's path: from hopper to delivery line"),
        body: [
          {
            ol: [
              l("تُفرغ شاحنة الخلاطة الخرسانة في القادوس، ويحرّكها المقلّب باستمرار حتى لا تترسّب.", "The mixer truck discharges concrete into the hopper, and the agitator keeps it moving so it does not settle."),
              l("في أسطوانة ضخ أولى يسحب المكبس الخرسانة من القادوس، وفي الثانية يدفعها المكبس إلى الأمام.", "In the first delivery cylinder the piston draws concrete in from the hopper; in the second the piston pushes it forward."),
              l("يتأرجح صمام S ليوصّل الأسطوانة التي تدفع بخط الضخ، ثم تتبادل الأسطوانتان الأدوار مع كل شوط.", "The S-valve swings to connect the pushing cylinder to the delivery line, and the two cylinders swap roles on every stroke."),
              l("تمر الخرسانة في الأنابيب والأكواع والوصلات (أو في ذراع الضخ) حتى خرطوم النهاية.", "The concrete travels through pipes, elbows and couplings (or the placing boom) to the end hose."),
              l("الزيت الهيدروليكي يحرّك الأسطوانات والصمام والمقلّب، ومبرّد الزيت والفلاتر يحافظان عليه باردًا ونظيفًا.", "Hydraulic oil moves the cylinders, the valve and the agitator, while the oil cooler and filters keep it cool and clean."),
            ],
          },
          {
            note: l(
              "هذا الوصف ينطبق على أغلب مضخات الشاحنات ذات صمام S. بعض التصاميم تستعمل نوع صمام آخر، فارجع إلى كتيّب موديلك.",
              "This describes most truck pumps with an S-valve. Some designs use a different valve type, so check your model's manual.",
            ),
          },
        ],
      },
      {
        h: l("الأجزاء وأسماؤها", "The parts and their names"),
        body: [
          {
            table: {
              head: [l("الجزء", "Part"), l("وظيفته", "What it does"), l("في الكتالوج", "In the catalogue")],
              rows: [
                [l("القادوس (Hopper)", "Hopper (القادوس)"), l("يستقبل الخرسانة من الشاحنة ويغذّي الأسطوانات.", "Receives concrete from the truck and feeds the cylinders."), l("[الخلاط والمقلّب](/category/mixer/)", "[Mixer and agitator parts](/category/mixer/)")],
                [l("المقلّب (Agitator): عمود الخلط والريش", "Agitator: shaft and paddles (المقلّب)"), l("يحرّك الخرسانة داخل القادوس نحو فتحات الأسطوانات.", "Moves the concrete inside the hopper toward the cylinder openings."), l("[المحامل](/category/bearings/) و[الخلاط](/category/mixer/)", "[Bearings](/category/bearings/) and [mixer parts](/category/mixer/)")],
                [l("أسطوانتا الضخ والمكبسان (Delivery cylinders and pistons)", "Delivery cylinders and pistons (أسطوانات الضخ)"), l("تسحب الخرسانة وتدفعها بالتناوب.", "Draw the concrete in and push it out in turn."), l("[المكابس والأسطوانات](/category/pistons/)", "[Pistons and cylinders](/category/pistons/)")],
                [l("سلندرات القيادة (Drive or plunger cylinders)", "Drive (plunger) cylinders (سلندرات القيادة)"), l("تحرّك مكابس الضخ بالزيت الهيدروليكي.", "Move the delivery pistons using hydraulic oil."), l("[المكابس](/category/pistons/) و[الأختام](/category/seals/)", "[Pistons](/category/pistons/) and [seals](/category/seals/)")],
                [l("صندوق الماء (Water box)", "Water box (صندوق الماء)"), l("خزان ماء بين أسطوانات القيادة والضخ يغسل ويبرّد قضبان المكابس.", "A water-filled box between the drive and delivery cylinders that washes and cools the piston rods."), l("[الأختام](/category/seals/)", "[Seals](/category/seals/)")],
                [l("صمام S (S-valve أو S-tube)", "S-valve or S-tube (صمام S)"), l("ينتقل بين الأسطوانتين ليوصّل التي تدفع بخط الضخ.", "Swings between the cylinders to connect the one that is pushing to the delivery line."), l("[قطع التآكل](/category/wear/)", "[Wear parts](/category/wear/)")],
                [l("لوحة النظارة (Spectacle plate)", "Spectacle plate (لوحة النظارة)"), l("لوحة مقسّاة بفتحتين عند مخرج القادوس، ينزلق عليها صمام S.", "A hardened plate with two openings at the hopper outlet, which the S-valve slides against."), l("[قطع التآكل](/category/wear/)", "[Wear parts](/category/wear/)")],
                [l("حلقة القطع (Cutting ring)", "Cutting ring (حلقة القطع)"), l("حلقة عند مدخل صمام S تحكم الإغلاق على لوحة النظارة وتقطع عمود الخرسانة.", "A ring on the S-valve inlet that seals against the spectacle plate and shears the concrete column."), l("[قطع التآكل](/category/wear/)", "[Wear parts](/category/wear/)")],
                [l("أنابيب الضخ والأكواع والوصلات", "Delivery pipes, elbows and couplings (أنابيب الضخ)"), l("تنقل الخرسانة إلى موضع الصب.", "Carry the concrete to the placing point."), l("[الأنابيب والوصلات](/category/pipes/)", "[Pipes and couplings](/category/pipes/)")],
                [l("خرطوم النهاية (End hose)", "End hose (خرطوم النهاية)"), l("الخرطوم المرن عند طرف الذراع أو الخط.", "The flexible hose at the tip of the boom or line."), l("[الخراطيم](/category/hoses/)", "[Hoses](/category/hoses/)")],
                [l("المضخة والمحرك الهيدروليكي (Hydraulic pump and motor)", "Hydraulic pump and motor (مضخة ومحرك هيدروليك)"), l("يولّدان تدفق الزيت الذي يحرّك كل شيء.", "Create the oil flow that drives everything."), l("[المضخات والمحركات](/category/pumps/)", "[Pumps and motors](/category/pumps/)")],
                [l("مبرّد الزيت والمروحة (Oil cooler and fan)", "Oil cooler and fan (مبرّد الزيت)"), l("يُخرجان الحرارة من الزيت.", "Take the heat out of the oil."), l("[التبريد والمراوح](/category/cooling/)", "[Cooling and fans](/category/cooling/)")],
                [l("الفلاتر (Filters)", "Filters (الفلاتر)"), l("تحجز الشوائب قبل أن تتلف المضخة والصمامات.", "Trap dirt before it damages the pump and valves."), l("[الفلاتر](/category/filters/)", "[Filters](/category/filters/)")],
                [l("ليمت سويتش وحساسات وصمامات سولينويد", "Limit switches, sensors and solenoid valves"), l("تخبر نظام التحكم بموضع الأجزاء وتفتح وتغلق مسارات الزيت.", "Tell the control system where the parts are and open and close the oil paths."), l("[الكهرباء](/category/electrical/) و[الصمامات](/category/valves/)", "[Electrical](/category/electrical/) and [valves](/category/valves/)")],
              ],
            },
          },
        ],
      },
      {
        h: l("ما الذي يتآكل منها أولًا", "What wears out first"),
        body: [
          {
            p: l(
              "الخرسانة كاشطة، لذلك أول ما يتآكل هو ما يحتك بها مباشرة: لوحة النظارة وحلقة القطع وصمام S ومكابس الضخ والأنابيب والأكواع. التفاصيل في دليل [قطع التآكل في مضخة الخرسانة](/guides/pump-wear-parts/)، وعلامات استبدال اللوحة والحلقة في [لوحة النظارة وحلقة القطع](/guides/spectacle-plate-cutting-ring/).",
              "Concrete is abrasive, so the first parts to wear are the ones that rub against it: the spectacle plate, cutting ring, S-valve, delivery pistons, pipes and elbows. Details are in [concrete pump wear parts](/guides/pump-wear-parts/), and the signs for the plate and ring are in [spectacle plate and cutting ring](/guides/spectacle-plate-cutting-ring/).",
            ),
          },
        ],
      },
      {
        h: l("كيف تستخدم هذه الأسماء عند الطلب", "How to use these names when you order"),
        body: [
          {
            ul: [
              l("قُل اسم القطعة وموضعها، مثل «حلقة القطع في صمام S»، ثم ماركة المضخة وموديلها من لوحة البيانات.", "Give the part name and where it sits, for example “cutting ring on the S-valve”, then the pump's make and model from its data plate."),
              l("الأسماء تختلف قليلًا بين الشركات (مثلًا Wear Plate وSpectacle Plate لنفس الشيء تقريبًا)، لذلك الصورة والرقم أدق من الاسم وحده. التفاصيل في [كيف تعرف رقم قطعة الغيار](/guides/find-part-number/).", "Names differ a little between makers (for example Wear Plate and Spectacle Plate for roughly the same thing), so a photo and a number are more exact than the name alone. See [how to find the part number](/guides/find-part-number/)."),
              l("أرسل الاسم أو الصورة على واتساب ونرد بالسعر والتوفر، كما في [كيف تطلب](/guides/how-to-order/).", "Send the name or photo on WhatsApp and we reply with price and availability, as in [how to order](/guides/how-to-order/)."),
            ],
          },
        ],
      },
    ],
    codes: ["201010-002", "201010-007", "201010-237", "201010-081", "201010-195", "201010-021"],
    cats: ["wear", "pistons", "pipes", "pumps", "cooling"],
    faq: [
      { q: l("ما هو صمام S في مضخة الخرسانة؟", "What is the S-valve on a concrete pump?"), a: l("هو الأنبوب المنحني الذي يتأرجح بين أسطوانتَي الضخ ليوصّل الأسطوانة التي تدفع بخط الضخ. يسمّى أيضًا S-tube لشكله.", "It is the curved tube that swings between the two delivery cylinders to connect the one that is pushing to the delivery line. It is also called the S-tube because of its shape.") },
      { q: l("ما هي لوحة النظارة؟", "What is the spectacle plate?"), a: l("لوحة مقسّاة بفتحتين، تشبه نظارة، مثبّتة عند مخرج القادوس. ينزلق عليها صمام S مع حلقة القطع، ولذلك هي من أهم قطع التآكل.", "A hardened plate with two openings, like a pair of glasses, fixed at the hopper outlet. The S-valve and cutting ring slide against it, which makes it a main wear part.") },
      { q: l("ما وظيفة صندوق الماء؟", "What does the water box do?"), a: l("هو صندوق ماء بين سلندرات القيادة وأسطوانات الضخ. يغسل ويبرّد قضبان المكابس، ولون مائه يساعد في اكتشاف تسرّب الخرسانة.", "It is a box of water between the drive cylinders and the delivery cylinders. It washes and cools the piston rods, and the colour of its water helps reveal concrete leaking past the pistons.") },
      { q: l("هل أسماء القطع واحدة في كل الماركات؟", "Are the part names the same on every make?"), a: l("لا. كل شركة تستعمل أسماءها، فاعتمد على رقم القطعة وموديل الآلة والصورة إضافةً إلى الاسم.", "No. Each maker uses its own names, so rely on the part number, the machine model and a photo as well as the name.") },
    ],
  },

  /* ------------------------------------------------- spectacle plate */
  {
    slug: "spectacle-plate-cutting-ring",
    date: DATE,
    cluster: "pumps",
    title: l(
      "لوحة النظارة وحلقة القطع: علامات التآكل ومتى تُستبدلان",
      "Spectacle Plate and Cutting Ring: Signs of Wear and When to Replace Them",
    ),
    desc: l(
      "متى تُستبدل لوحة النظارة وحلقة القطع في مضخة الخرسانة: علامات التآكل، لماذا تُستبدلان معًا، وماذا ترسل لنا لنحدد القطعة المناسبة لمضختك.",
      "When to replace the spectacle plate and cutting ring on a concrete pump: signs of wear, why they are replaced as a pair, and what to send us so we identify the right parts for your pump.",
    ),
    answer: l(
      "تُستبدل لوحة النظارة وحلقة القطع حين يتسرّب ملاط الخرسانة (ماء وإسمنت) من الفاصل بينهما، أو ينخفض الإنتاج، أو يظهر على سطح الانزلاق تآكل أو خدوش واضحة. الأفضل استبدالهما معًا، ولا تؤخّر ذلك لأن اللوحة المتآكلة قد تتلف القطع المجاورة.",
      "Replace the spectacle plate and cutting ring when cement slurry leaks from the joint between them, output drops, or the sliding surface shows clear wear or grooves. Replace them as a pair, and do not leave it too late: a worn plate can start to damage the parts next to it.",
    ),
    intro: l(
      "هاتان القطعتان صُمّمتا لتتآكلا حتى تحميا صمام S والقادوس. معرفة علامات تآكلهما توفّر عليك توقّف المضخة في الموقع.",
      "These two parts are made to wear so that they protect the S-valve and the hopper. Knowing the signs of wear saves you a pump stop on site.",
    ),
    sections: [
      {
        h: l("ماذا تفعل هاتان القطعتان", "What the two parts do"),
        body: [
          {
            p: l(
              "لوحة النظارة لوحة مقسّاة ثابتة عند مخرج القادوس، وحلقة القطع حلقة على مدخل صمام S تنزلق على اللوحة. الحلقة تغلق المسار وتقطع عمود الخرسانة، فتحتكّ القطعتان ببعضهما وبالخرسانة مع كل شوط. لذلك هما من أول القطع التي تُستبدل، وتجدهما في قسم [قطع التآكل](/category/wear/).",
              "The spectacle plate is a hardened plate fixed at the hopper outlet, and the cutting ring sits on the S-valve inlet and slides against it. The ring seals the path and shears the concrete column, so the two rub on each other and on the concrete with every stroke. That is why they are among the first parts replaced. You will find them under [wear parts](/category/wear/).",
            ),
          },
        ],
      },
      {
        h: l("علامات التآكل", "Signs of wear"),
        body: [
          {
            ul: [
              l("ملاط (ماء وإسمنت) يتسرّب أو يتناثر عند الفاصل بين الحلقة واللوحة.", "Slurry (water and cement) leaking or spraying at the joint between ring and plate."),
              l("انخفاض الإنتاج مع أن الخرسانة والخط والزيت سليمة. راجع أيضًا [ضعف الضخ: الأسباب المحتملة](/guides/concrete-pump-slow-weak-output/).", "Lower output although the concrete, the line and the oil are fine. See also [slow or weak output: possible causes](/guides/concrete-pump-slow-weak-output/)."),
              l("خدوش أو أخاديد أو درجات على سطح الانزلاق، أو سطح مقعّر بدل أن يكون مستويًا.", "Grooves, steps or a dished surface on the sliding face instead of a flat one."),
              l("كسر أو تشقق أو حافة متآكلة في الحلقة أو اللوحة.", "A crack, chip or worn edge on the ring or plate."),
            ],
          },
        ],
      },
      {
        h: l("لماذا تُستبدلان معًا", "Why they are replaced together"),
        body: [
          {
            p: l(
              "حلقة جديدة على لوحة متآكلة لا تُحكم الإغلاق جيدًا وتتآكل بسرعة، ولوحة جديدة مع حلقة قديمة تتآكل بالطريقة نفسها. لذلك تُستبدل القطعتان معًا في العادة. افحص في الوقت نفسه حلقة الدفع (Thrust ring) التي تُبقي صمام S ملتصقًا باللوحة، وكُم التآكل (Wear sleeve) والأختام في بيت صمام S.",
              "A new ring on a worn plate does not seal well and wears fast, and a new plate with an old ring wears the same way. That is why the two are normally replaced together. At the same time, check the thrust ring that keeps the S-valve seated against the plate, the wear sleeve and the seals in the S-valve housing.",
            ),
          },
        ],
      },
      {
        h: l("ماذا ترسل لنا لنحدد القطعة", "What to send us so we identify the part"),
        body: [
          {
            table: {
              head: [l("المعلومة", "What to send"), l("لماذا تهمّ", "Why it matters")],
              rows: [
                [l("ماركة المضخة وموديلها", "Pump make and model"), l("القطعتان تُصنعان لكل موديل ومقاس، ولا تتبادلان بين الموديلات.", "The plate and ring are made per model and size and do not swap between models.")],
                [l("الرقم المنقوش أو المقاس", "Stamped number or size"), l("في الكتالوج يظهر المقاس في الاسم، مثل «Cutting Ring 210» أو «Wearing Insert 230»، ونطابقه مع مضختك.", "In the catalogue the size is in the name, such as “Cutting Ring 210” or “Wearing Insert 230”, and we match it to your pump.")],
                [l("صورة القطعتين القديمتين من الأمام", "A front photo of the old pair"), l("تُظهر شكل التآكل وعدد الفتحات وطريقة التثبيت.", "Shows the wear pattern, the number of openings and the fixing method.")],
              ],
            },
          },
          {
            p: l(
              "أرسلها على واتساب كما في [كيف تطلب](/guides/how-to-order/). لقطع بوتزمايستر راجع [قطع بوتزمايستر في الرياض](/guides/putzmeister-spare-parts-riyadh/)، ولقطع شوينج [قطع شوينج في الرياض](/guides/schwing-spare-parts-riyadh/).",
              "Send them on WhatsApp as in [how to order](/guides/how-to-order/). For Putzmeister see [Putzmeister spare parts in Riyadh](/guides/putzmeister-spare-parts-riyadh/), and for Schwing [Schwing spare parts in Riyadh](/guides/schwing-spare-parts-riyadh/).",
            ),
          },
        ],
      },
    ],
    codes: ["201010-002", "201010-001", "201010-007", "201010-008", "201010-020", "201010-016"],
    cats: ["wear", "seals"],
    faq: [
      { q: l("كم تدوم لوحة النظارة وحلقة القطع؟", "How long do the spectacle plate and cutting ring last?"), a: l("لا يوجد رقم صادق يصلح للجميع. العمر يتغيّر حسب نوع الخلطة والركام وكمية الضخ، لذلك الأفضل فحصهما بانتظام واستبدالهما عند ظهور العلامات.", "There is no honest figure that fits everyone. Life depends on the mix, the aggregate and the volume pumped, so inspect them regularly and replace them when the signs appear.") },
      { q: l("هل أستبدل الحلقة فقط؟", "Can I replace only the ring?"), a: l("ممكن تقنيًا، لكن الأفضل استبدال الحلقة واللوحة معًا لأن القطعة الجديدة تتآكل بسرعة إذا احتكّت بقطعة متآكلة.", "It is possible, but replacing the ring and plate together is better, because a new part wears quickly against a worn one.") },
      { q: l("هل توفّرون هذه القطع لبوتزمايستر وشوينج؟", "Do you supply these parts for Putzmeister and Schwing?"), a: l("الكتالوج يعرض لوحات وحلقات لمضخات بوتزمايستر وشوينج. أرسل ماركة المضخة وموديلها أو صورة القطعة لنؤكد المطابقة.", "The catalogue lists plates and rings for Putzmeister and Schwing pumps. Send the pump make and model or a photo of the part and we confirm the match.") },
      { q: l("ماذا أفحص معهما عند الاستبدال؟", "What else should I check when replacing them?"), a: l("حلقة الدفع وكُم التآكل والأختام في بيت صمام S، لأنها تعمل مع اللوحة والحلقة وتتآكل في الظروف نفسها.", "The thrust ring, the wear sleeve and the seals in the S-valve housing, because they work with the plate and ring and wear in the same conditions.") },
    ],
  },

  /* ------------------------------------------------------ overheating */
  {
    slug: "hydraulic-oil-overheating-concrete-pump",
    date: DATE,
    cluster: "pumps",
    title: l(
      "ارتفاع حرارة زيت الهيدروليك في مضخة الخرسانة: الأسباب وما تفحصه أولًا",
      "Hydraulic Oil Overheating in a Concrete Pump: Causes and What to Check First",
    ),
    desc: l(
      "أسباب ارتفاع حرارة زيت الهيدروليك في مضخة الخرسانة: المبرّد والمروحة، مستوى الزيت، الفلاتر، وتآكل المضخة. ترتيب الفحص من الأسهل إلى الأصعب.",
      "Why the hydraulic oil overheats on a concrete pump: cooler and fan, oil level, filters and pump wear. A check order from easiest to hardest.",
    ),
    answer: l(
      "من الأسباب الشائعة لارتفاع حرارة زيت الهيدروليك: مبرّد زيت متسخ، أو مروحة لا تعمل، أو نقص الزيت أو زيت متقادم، أو فلاتر مسدودة، أو تآكل داخلي في المضخة أو المحرك. افحص المبرّد والمروحة والمستوى أولًا قبل شراء أي قطعة غالية.",
      "Common reasons for overheating hydraulic oil are a dirty oil cooler, a fan that is not working, low or old oil, clogged filters, or internal wear in the pump or motor. Check the cooler, the fan and the oil level first, before buying any expensive part.",
    ),
    intro: l(
      "زيت ساخن يعني فقدان تشحيم وعمرًا أقصر للأختام والمضخة. إذا ارتفعت حرارة الزيت في مضختك فهذا ترتيب الفحص الذي نوصي به، من الأرخص إلى الأغلى.",
      "Hot oil means weaker lubrication and a shorter life for seals and the pump. If the oil on your pump runs hot, this is the order we suggest checking, from cheapest to dearest.",
    ),
    sections: [
      {
        h: l("لماذا ترتفع الحرارة", "Why the oil heats up"),
        body: [
          {
            p: l(
              "أي طاقة تضيع داخل النظام الهيدروليكي (تسرّب داخلي، اختناق، احتكاك) تتحول إلى حرارة. مبرّد الزيت يُخرج هذه الحرارة. حين تزيد الحرارة المتولّدة عن الحرارة التي يُخرجها المبرّد ترتفع حرارة الزيت. لذلك الأسباب إما أن المبرّد ضعيف، أو أن النظام يولّد حرارة زائدة.",
              "Any energy lost inside a hydraulic system (internal leakage, restriction, friction) turns into heat, and the oil cooler takes that heat out. When the heat produced is more than the cooler removes, the oil temperature climbs. So the cause is either a weak cooler or a system producing too much heat.",
            ),
          },
        ],
      },
      {
        h: l("افحص بهذا الترتيب", "Check in this order"),
        body: [
          {
            ol: [
              l("مستوى الزيت وحالته: مستوى منخفض، أو زيت داكن ورائحته محروقة، أو فيه رغوة أو مظهر حليبي.", "Oil level and condition: a low level, or dark oil with a burnt smell, foam or a milky look."),
              l("زعانف مبرّد الزيت: هل هي مسدودة بالغبار أو برذاذ الخرسانة؟ التنظيف أرخص إصلاح.", "The oil cooler fins: are they blocked with dust or concrete spray? Cleaning is the cheapest fix."),
              l("مروحة التبريد: هل تدور حين يسخن الزيت؟ في كثير من الآلات يشغّلها حساس حرارة أو مفتاح حراري، فتحقق من الكهرباء والحساس قبل استبدال المروحة.", "The cooling fan: does it turn when the oil is hot? On many machines a temperature sensor or switch turns it on, so check the supply and the sensor before replacing the fan."),
              l("الفلاتر: فلتر مسدود يخنق الدورة ويرفع الحرارة. راجع [فلاتر الهيدروليك في مضخة الخرسانة](/guides/hydraulic-filters-concrete-pump/).", "The filters: a clogged filter chokes the circuit and raises the heat. See [hydraulic filters on a concrete pump](/guides/hydraulic-filters-concrete-pump/)."),
              l("الخراطيم والوصلات: خرطوم مطوي أو مضغوط يختنق عنده الزيت.", "Hoses and fittings: a kinked or crushed hose chokes the oil."),
              l("المضخة والمحرك الهيدروليكي: إذا كان كل ما سبق سليمًا وبقيت الحرارة عالية مع ضجيج أو ضعف في الأداء، فقد يكون هناك تآكل داخلي ويحتاج فحصًا في ورشة مجهّزة.", "The hydraulic pump and motor: if all of the above is fine and the oil still runs hot with noise or weak performance, there may be internal wear that needs testing in an equipped workshop."),
            ],
          },
        ],
      },
      {
        h: l("العَرَض، السبب المحتمل، وأين تبحث", "Symptom, likely cause and where to look"),
        body: [
          {
            table: {
              head: [l("العَرَض", "Symptom"), l("السبب المحتمل", "Likely cause"), l("القطعة", "Part")],
              rows: [
                [l("المروحة لا تدور والزيت ساخن", "Fan not turning while the oil is hot"), l("عطل في المروحة أو الأسلاك أو الحساس.", "Fan, wiring or sensor fault."), l("[التبريد والمراوح](/category/cooling/) و[الكهرباء](/category/electrical/)", "[Cooling and fans](/category/cooling/) and [electrical](/category/electrical/)")],
                [l("زعانف المبرّد مسدودة", "Cooler fins blocked"), l("غبار ورذاذ خرسانة يمنعان مرور الهواء.", "Dust and concrete spray stop the air flow."), l("التنظيف أولًا، ثم [المبرّد](/category/cooling/) إذا تلف", "Clean first, then the [cooler](/category/cooling/) if damaged")],
                [l("زيت داكن أو رائحته محروقة", "Dark oil or a burnt smell"), l("زيت متقادم أو حمل زائد.", "Old oil or overload."), l("تغيير الزيت مع [الفلاتر](/category/filters/)", "Change the oil together with the [filters](/category/filters/)")],
                [l("مضخة بصوت عالٍ وساخنة وأداء ضعيف", "Noisy, hot pump with weak output"), l("تآكل داخلي.", "Internal wear."), l("فحص في ورشة، ثم [المضخات والمحركات](/category/pumps/)", "Workshop test, then [pumps and motors](/category/pumps/)")],
              ],
            },
          },
        ],
      },
      {
        h: l("ما لا تفعله", "What not to do"),
        body: [
          {
            ul: [
              l("لا تكمل الضخ والزيت فوق الحد المسموح في دليل الآلة. الحد يختلف من آلة إلى أخرى ومن زيت إلى آخر.", "Do not keep pumping when the oil is above the limit in your machine's manual. The limit differs between machines and oils."),
              l("لا تغيّر ضبط صمامات الضغط (Relief) لتخفيف الحرارة دون الرجوع إلى الدليل، فقد تتلف المضخة أو تفقد الأمان.", "Do not change the relief valve settings to cut the heat without the manual; you can damage the pump or lose safety."),
              l("لا تركّب مروحة أو مبرّدًا بمواصفات مختلفة عن الأصل. اطلب القطعة برقمها أو بصورتها كما في [كيف تعرف رقم القطعة](/guides/find-part-number/).", "Do not fit a fan or cooler with different specifications from the original. Order by number or photo as in [how to find the part number](/guides/find-part-number/)."),
            ],
          },
          {
            note: l(
              "الوقاية أفضل من العلاج: تنظيف المبرّد وفحص المستوى ضمن [قائمة صيانة مضخة الخرسانة](/guides/concrete-pump-maintenance-checklist/).",
              "Prevention is cheaper than repair: cleaning the cooler and checking the level are part of the [concrete pump maintenance checklist](/guides/concrete-pump-maintenance-checklist/).",
            ),
          },
        ],
      },
    ],
    codes: ["201010-195", "201010-297", "201010-293", "201010-565", "201010-031", "201010-171"],
    cats: ["cooling", "filters", "pumps", "electrical"],
    faq: [
      { q: l("ما درجة الحرارة التي تُعدّ مرتفعة؟", "What temperature counts as too hot?"), a: l("الحد مكتوب في دليل الآلة وعلى مؤشر الحرارة فيها. لا نذكر رقمًا لأنه يختلف باختلاف الآلة والزيت.", "The limit is in the machine's manual and on its temperature gauge. We do not quote a figure because it differs by machine and oil.") },
      { q: l("هل يكفي تنظيف المبرّد؟", "Is cleaning the cooler enough?"), a: l("أحيانًا نعم، خاصة إذا كانت الزعانف مسدودة بالغبار أو الخرسانة. إذا بقيت الحرارة عالية فتابع بقية خطوات الفحص.", "Sometimes, especially when the fins are blocked with dust or concrete. If the oil still runs hot, continue with the other checks.") },
      { q: l("هل تضرّ الحرارة العالية بالمضخة؟", "Does high temperature damage the pump?"), a: l("نعم. الزيت الساخن يصبح أرقّ فيضعف التشحيم، وتتقادم الأختام أسرع، فيقصر عمر المضخة والأختام.", "Yes. Hot oil gets thinner and lubricates less, and seals age faster, which shortens the life of the pump and seals.") },
      { q: l("هل أركّب مروحة أكبر؟", "Should I fit a bigger fan?"), a: l("لا. المروحة تُختار بمواصفات النظام الكهربائي والمبرّد. اطلب المروحة المطابقة للأصل بالرقم أو بالصورة.", "No. The fan is chosen to match the electrical system and the cooler. Order the one that matches the original by number or photo.") },
    ],
  },

  /* ----------------------------------------------------- slow output */
  {
    slug: "concrete-pump-slow-weak-output",
    date: DATE,
    cluster: "pumps",
    title: l(
      "مضخة الخرسانة بطيئة أو ضعيفة الضخ: الأسباب المحتملة وما تفحصه",
      "Concrete Pump Slow or Weak Output: Possible Causes and What to Check",
    ),
    desc: l(
      "إذا انخفض إنتاج مضخة الخرسانة: افحص الخرسانة والخط، ثم لوحة النظارة وحلقة القطع، ومكابس الضخ، والفلاتر، والمضخة الهيدروليكية. جدول بالأعراض والأسباب.",
      "If a concrete pump's output drops: check the concrete and the line, then the spectacle plate and cutting ring, the delivery pistons, the filters and the hydraulic pump. A table of symptoms and causes.",
    ),
    answer: l(
      "عند انخفاض إنتاج مضخة الخرسانة ابدأ بالأسهل: الخرسانة وانسداد الخط، ثم تسرّب الملاط عند لوحة النظارة وحلقة القطع، ثم أختام مكابس الضخ، ثم الفلاتر وحرارة الزيت، وأخيرًا المضخة الهيدروليكية. لا تستبدل قطعة قبل أن تعرف العَرَض الذي يدل عليها.",
      "When a concrete pump's output drops, start with the easy checks: the concrete and any blockage in the line, then slurry leaking at the spectacle plate and cutting ring, then the delivery piston seals, then the filters and oil temperature, and last the hydraulic pump. Do not replace a part before you know the symptom that points to it.",
    ),
    intro: l(
      "«المضخة ضعيفة» وصف يناسب عشرة أسباب مختلفة. هذا الدليل يربط كل عَرَض بسببه المحتمل حتى لا تدفع ثمن قطعة لا تحتاجها.",
      "“The pump is weak” fits ten different causes. This guide ties each symptom to its likely cause so you do not pay for a part you do not need.",
    ),
    sections: [
      {
        h: l("قبل أن تفتح أي شيء", "Before you open anything"),
        body: [
          {
            p: l(
              "الخرسانة الجافة جدًا أو المنفصلة، أو خط ضخ طويل أو مسدود جزئيًا، يجعل أي مضخة تبدو ضعيفة وهي سليمة. تأكد من الخلطة والخط وإعدادات المضخة أولًا.",
              "Concrete that is too stiff or has segregated, or a long or partly blocked line, can make any pump look weak when it is fine. Check the mix, the line and the pump settings first.",
            ),
          },
        ],
      },
      {
        h: l("العَرَض والسبب المحتمل", "Symptom and likely cause"),
        body: [
          {
            table: {
              head: [l("العَرَض", "Symptom"), l("السبب المحتمل", "Likely cause"), l("أين تبحث", "Where to look")],
              rows: [
                [l("ملاط يتسرّب من فاصل اللوحة والحلقة وينخفض الإنتاج", "Slurry leaks from the plate-and-ring joint and output drops"), l("تآكل لوحة النظارة وحلقة القطع.", "Worn spectacle plate and cutting ring."), l("[لوحة النظارة وحلقة القطع](/guides/spectacle-plate-cutting-ring/)", "[Spectacle plate and cutting ring](/guides/spectacle-plate-cutting-ring/)")],
                [l("ماء صندوق الماء يتحول رماديًا أو يخرج منه إسمنت", "Water in the water box turns grey or carries cement"), l("خرسانة تمرّ من جانب مكبس الضخ، وهذا قد يدل على تآكل أختام المكبس.", "Concrete passing the delivery piston, which can point to worn piston seals."), l("[المكابس](/category/pistons/) و[الأختام](/category/seals/)", "[Pistons](/category/pistons/) and [seals](/category/seals/)")],
                [l("الضخ بطيء والزيت ساخن", "Slow pumping and hot oil"), l("مبرّد أو مروحة أو فلتر أو زيت.", "Cooler, fan, filter or oil."), l("[ارتفاع حرارة الزيت](/guides/hydraulic-oil-overheating-concrete-pump/)", "[Hydraulic oil overheating](/guides/hydraulic-oil-overheating-concrete-pump/)")],
                [l("كل الحركات بطيئة وقراءة الضغط منخفضة", "Every movement is slow and the pressure reads low"), l("تآكل داخلي في المضخة الهيدروليكية.", "Internal wear in the hydraulic pump."), l("فحص في ورشة، ثم [المضخات](/category/pumps/)", "Workshop test, then [pumps](/category/pumps/)")],
                [l("صمام S يتأخر أو يتردد في الحركة", "The S-valve is late or hesitates"), l("أختام سلندرات التأرجح أو صمام سولينويد أو ملف أو شحنة المركّم.", "Swing cylinder seals, a solenoid valve or coil, or accumulator charge."), l("[الصمامات](/category/valves/) و[الأختام](/category/seals/)", "[Valves](/category/valves/) and [seals](/category/seals/)")],
                [l("توقف متقطع أو أخطاء في التحكم", "Intermittent stops or control faults"), l("ليمت سويتش أو حساس أو وصلة كهرباء.", "A limit switch, sensor or electrical connector."), l("[الكهرباء](/category/electrical/)", "[Electrical](/category/electrical/)")],
              ],
            },
          },
        ],
      },
      {
        h: l("الفحوص الرخيصة أولًا", "Cheap checks first"),
        body: [
          {
            ul: [
              l("الفلاتر: فلتر مسدود يقلّل التدفق. راجع [فلاتر الهيدروليك](/guides/hydraulic-filters-concrete-pump/).", "Filters: a clogged filter cuts the flow. See [hydraulic filters](/guides/hydraulic-filters-concrete-pump/)."),
              l("ملفات السولينويد والليمت سويتش والحساسات: قطع صغيرة يسهل اختبارها واستبدالها.", "Solenoid coils, limit switches and sensors: small parts that are easy to test and replace."),
              l("الأنابيب والأكواع: جدار رقيق من الداخل يرفع المقاومة ويشكّل خطرًا. راجع [أنابيب الضخ والأكواع](/guides/delivery-pipes-elbows-couplings/).", "Pipes and elbows: a thin wall inside raises resistance and is a safety risk. See [delivery pipes and elbows](/guides/delivery-pipes-elbows-couplings/)."),
            ],
          },
        ],
      },
      {
        h: l("متى تذهب إلى ورشة", "When to go to a workshop"),
        body: [
          {
            p: l(
              "قياس ضغط المضخة الهيدروليكية وفحص التسريب الداخلي يحتاجان أجهزة قياس وخبرة. إذا استبعدت الأسباب الأسهل فاحمل المضخة أو المحرك إلى ورشة هيدروليك، وأرسل لنا رمز الطراز المطبوع عليها لنحدد البديل، كما في [رموز المضخات والمحركات الهيدروليكية](/guides/hydraulic-pump-motor-codes/).",
              "Measuring hydraulic pump pressure and testing internal leakage need gauges and experience. Once the easier causes are ruled out, take the pump or motor to a hydraulic workshop, and send us the type code printed on it so we identify the replacement, as in [hydraulic pump and motor codes](/guides/hydraulic-pump-motor-codes/).",
            ),
          },
        ],
      },
    ],
    codes: ["201010-002", "201010-007", "201010-115", "201010-237", "201010-132", "201010-167"],
    cats: ["wear", "pistons", "seals", "valves", "filters", "pumps"],
    faq: [
      { q: l("لماذا يتحول ماء صندوق الماء إلى لون رمادي؟", "Why does the water in the water box turn grey?"), a: l("اللون الرمادي يعني غالبًا أن ملاط الخرسانة يمرّ من جانب مكبس الضخ إلى الصندوق، وهذا قد يدل على تآكل أختام المكبس. افحصها قبل أن تتلف القضبان.", "Grey water usually means cement slurry is getting past a delivery piston into the box, which can point to worn piston seals. Check them before the rods are damaged.") },
      { q: l("هل يسبب الفلتر المسدود ضعفًا في الضخ؟", "Can a clogged filter cause weak pumping?"), a: l("نعم، لأنه يقلّل تدفق الزيت ويرفع الحرارة. استبداله من أرخص الفحوص.", "Yes, because it cuts the oil flow and raises the temperature. Replacing it is one of the cheapest checks.") },
      { q: l("كيف أعرف أن المضخة الهيدروليكية متآكلة؟", "How do I know the hydraulic pump is worn?"), a: l("العلامات: ضجيج، حرارة عالية، وبطء في كل الحركات مع قراءة ضغط منخفضة. التأكيد يكون باختبار في ورشة مجهّزة.", "Signs are noise, high temperature and slow movements with a low pressure reading. Confirmation needs a test in an equipped workshop.") },
      { q: l("هل أستبدل القطع كلها دفعة واحدة؟", "Should I replace everything at once?"), a: l("لا. حدّد العَرَض أولًا ثم استبدل القطعة المرتبطة به، وتجنّب شراء قطع قبل أن تفحص.", "No. Identify the symptom first, then replace the part tied to it, and avoid buying parts before you have inspected.") },
    ],
  },

  /* ------------------------------------------------------- maintenance */
  {
    slug: "concrete-pump-maintenance-checklist",
    date: DATE,
    cluster: "pumps",
    title: l(
      "قائمة صيانة مضخة الخرسانة: ما تفحصه بعد كل ضخ ويوميًا ودوريًا",
      "Concrete Pump Maintenance Checklist: After Every Pour, Daily and Periodic Checks",
    ),
    desc: l(
      "قائمة صيانة عملية لمضخة الخرسانة: التنظيف بعد الضخ، الفحص اليومي للزيت والماء، والفحص الدوري للفلاتر وقطع التآكل. الفواصل الزمنية حسب دليل الآلة.",
      "A practical concrete pump maintenance checklist: cleaning after pumping, daily oil and water checks, and periodic checks of filters and wear parts. Exact intervals come from your machine's manual.",
    ),
    answer: l(
      "صيانة مضخة الخرسانة روتين بسيط: تنظيف القادوس والخط بعد كل ضخ، وفحص مستوى الزيت وماء صندوق الماء والتشحيم والتسريبات يوميًا، وفحص الفلاتر والمبرّد وقطع التآكل دوريًا. الفواصل الزمنية الدقيقة موجودة في دليل الشركة المصنّعة لآلتك.",
      "Concrete pump maintenance is a simple routine: clean the hopper and line after every pour, check the oil level, water box, lubrication and leaks daily, and check the filters, cooler and wear parts periodically. The exact intervals are in your machine maker's manual.",
    ),
    intro: l(
      "أغلب الأعطال المكلفة تبدأ بإهمال صغير: خرسانة تجفّ في القادوس، أو فلتر لم يُغيّر، أو ماء متسخ في صندوق الماء. هذه قائمة تُطبع وتُعلّق في الورشة.",
      "Most expensive breakdowns start with a small neglect: concrete setting in the hopper, a filter not changed, or dirty water in the water box. This is a list to print and hang in the workshop.",
    ),
    sections: [
      {
        h: l("بعد كل عملية ضخ", "After every pour"),
        body: [
          {
            ul: [
              l("اغسل القادوس والمقلّب وخط الضخ جيدًا قبل أن تتصلّب الخرسانة، فبقاياها المتصلّبة تتلف القطع.", "Wash the hopper, agitator and delivery line thoroughly before the concrete sets, because hardened residue damages parts."),
              l("افحص ماء صندوق الماء: هل هو نظيف؟ اللون الرمادي قد يعني تآكل أختام المكابس.", "Check the water box: is it clean? Grey water can mean worn piston seals."),
              l("ابحث عن تسرّب ملاط عند لوحة النظارة وحلقة القطع، وعن أي تسرّب زيت.", "Look for slurry leaking at the spectacle plate and cutting ring, and for any oil leak."),
              l("افحص خرطوم النهاية والوصلات والمسامير والدبابيس.", "Inspect the end hose, couplings, bolts and pins."),
            ],
          },
        ],
      },
      {
        h: l("قبل التشغيل كل يوم", "Before starting each day"),
        body: [
          {
            ul: [
              l("مستوى زيت الهيدروليك، وحالة الزيت (لونه ورائحته).", "Hydraulic oil level and condition (colour and smell)."),
              l("مستوى ماء صندوق الماء ونظافته.", "Water box level and cleanliness."),
              l("نقاط التشحيم، ونظام التشحيم المركزي إن وُجد، حسب دليل الآلة.", "Grease points, and the central lubrication system if fitted, as the manual says."),
              l("زعانف مبرّد الزيت ومروحته: نظيفة وتدور؟", "Oil cooler fins and fan: clean and turning?"),
              l("الخراطيم والوصلات: لا تسرّب ولا تشقق.", "Hoses and fittings: no leaks or cracks."),
              l("أجهزة الأمان وأزرار الإيقاف تعمل.", "Safety devices and stop buttons work."),
            ],
          },
        ],
      },
      {
        h: l("دوريًا حسب دليل الآلة", "Periodically, as the manual says"),
        body: [
          {
            table: {
              head: [l("البند", "Item"), l("ماذا تفحص", "What to check"), l("في الكتالوج", "In the catalogue")],
              rows: [
                [l("فلاتر الهيدروليك", "Hydraulic filters"), l("مؤشر الانسداد، والاستبدال في موعده. راجع [فلاتر الهيدروليك](/guides/hydraulic-filters-concrete-pump/).", "The clogging indicator, and replacement on schedule. See [hydraulic filters](/guides/hydraulic-filters-concrete-pump/)."), l("[الفلاتر](/category/filters/)", "[Filters](/category/filters/)")],
                [l("لوحة النظارة وحلقة القطع", "Spectacle plate and cutting ring"), l("خدوش وتسرّب. راجع [علامات التآكل](/guides/spectacle-plate-cutting-ring/).", "Grooves and leaks. See the [signs of wear](/guides/spectacle-plate-cutting-ring/)."), l("[قطع التآكل](/category/wear/)", "[Wear parts](/category/wear/)")],
                [l("أختام المكابس والسلندرات", "Piston and cylinder seals"), l("تسرّب أو ماء متسخ في صندوق الماء.", "Leaks or dirty water in the water box."), l("[الأختام](/category/seals/)", "[Seals](/category/seals/)")],
                [l("محامل المقلّب والريش", "Agitator bearings and paddles"), l("لعب أو ضجيج أو ريش متآكلة.", "Play, noise or worn paddles."), l("[المحامل](/category/bearings/) و[الخلاط](/category/mixer/)", "[Bearings](/category/bearings/) and [mixer parts](/category/mixer/)")],
                [l("أنابيب الضخ والأكواع", "Delivery pipes and elbows"), l("رقّة الجدار والتشقق. راجع [أنابيب الضخ](/guides/delivery-pipes-elbows-couplings/).", "Wall thinning and cracks. See [delivery pipes](/guides/delivery-pipes-elbows-couplings/)."), l("[الأنابيب](/category/pipes/)", "[Pipes](/category/pipes/)")],
                [l("الكهرباء والحساسات", "Electrics and sensors"), l("الوصلات والليمت سويتش والبطارية.", "Connectors, limit switches and the battery."), l("[الكهرباء](/category/electrical/)", "[Electrical](/category/electrical/)")],
              ],
            },
          },
        ],
      },
      {
        h: l("قطع احتياطية تستحق أن تبقى في الورشة", "Spares worth keeping in the workshop"),
        body: [
          {
            p: l(
              "القطع الصغيرة التي توقف الضخ في الموقع: فلاتر الهيدروليك، وأطقم الأختام، وملفات السولينويد، وليمت سويتش، وخراطيم. قطعة بسعر قليل في الورشة أفضل من يوم توقف في الموقع. اسألنا عن القطعة بالرقم أو الصورة كما في [كيف تطلب](/guides/how-to-order/).",
              "The small parts that stop a pump on site: hydraulic filters, seal kits, solenoid coils, limit switches and hoses. An inexpensive part on the workshop shelf beats a day lost on site. Ask us about a part by number or photo as in [how to order](/guides/how-to-order/).",
            ),
          },
          {
            note: l(
              "هذه القائمة عامة. أرقام الفواصل الزمنية (ساعات التشغيل لتغيير الزيت والفلاتر) تختلف بين الماركات والموديلات، والمرجع هو دليل الشركة المصنّعة لآلتك.",
              "This list is general. The interval figures (operating hours for oil and filter changes) differ between makes and models, and the reference is your machine maker's manual.",
            ),
          },
        ],
      },
    ],
    codes: ["201010-031", "201010-195", "201010-003", "201010-012", "201010-083", "201010-167"],
    cats: ["filters", "seals", "wear", "cooling", "electrical", "bearings"],
    faq: [
      { q: l("كم مرة أغيّر فلاتر الهيدروليك؟", "How often should I change the hydraulic filters?"), a: l("حسب الفاصل المكتوب في دليل الآلة، أو عندما يشير مؤشر الانسداد إلى ذلك. الفاصل يختلف باختلاف الموديل، لذلك لا نذكر رقمًا عامًا.", "As the interval in the machine manual says, or when the clogging indicator shows it. The interval differs by model, so we do not give one general figure.") },
      { q: l("لماذا أغسل المضخة فور انتهاء الضخ؟", "Why wash the pump straight after pumping?"), a: l("لأن الخرسانة المتصلّبة داخل القادوس والأنابيب والصمام تتلف القطع وتصعّب التشغيل التالي.", "Because concrete that sets inside the hopper, pipes and valve damages parts and makes the next start harder.") },
      { q: l("ما أهم قطع احتياطية؟", "Which spare parts matter most?"), a: l("الفلاتر وأطقم الأختام وملفات السولينويد والليمت سويتش والخراطيم، لأنها صغيرة وتوقف الضخ إذا تعطلت.", "Filters, seal kits, solenoid coils, limit switches and hoses, because they are small and stop the pump when they fail.") },
      { q: l("هل التشحيم ضروري كل يوم؟", "Is lubrication needed every day?"), a: l("حسب دليل الآلة. بعض الآلات فيها تشحيم مركزي وبعضها نقاط يدوية، فاتبع جدول الشركة المصنّعة.", "As the machine manual says. Some machines have central lubrication and some have manual points, so follow the maker's schedule.") },
    ],
  },

  /* --------------------------------------------------------- filters */
  {
    slug: "hydraulic-filters-concrete-pump",
    date: DATE,
    cluster: "pumps",
    title: l(
      "فلاتر الهيدروليك في مضخة الخرسانة: الأنواع ومتى تُستبدل وكيف تطلبها",
      "Hydraulic Filters on a Concrete Pump: Types, When to Replace and How to Order",
    ),
    desc: l(
      "أنواع فلاتر الهيدروليك في مضخة الخرسانة، علامات انسدادها، ومتى تُستبدل، وكيف تطلب الفلتر الصحيح بالرقم المطبوع عليه.",
      "Types of hydraulic filter on a concrete pump, the signs of clogging, when to replace them, and how to order the right filter by the number printed on it.",
    ),
    answer: l(
      "فلاتر الهيدروليك تحجز الشوائب التي تتلف المضخة والصمامات. يُستبدل الفلتر حسب الفاصل في دليل الآلة أو حين يشير المؤشر إلى انسداده. اطلبه برقمه المطبوع على الغلاف أو الملصق، لأن فلترين متشابهين شكلًا قد يختلفان في درجة الترشيح والوصلات.",
      "Hydraulic filters trap the dirt that damages the pump and valves. Replace a filter at the interval in the machine manual or when the indicator shows it is clogged. Order it by the number printed on the housing or label, because two filters that look alike can differ in filtration rating and connections.",
    ),
    intro: l(
      "التلوّث هو أحد أبرز أسباب تلف المضخات والصمامات الهيدروليكية، والفلتر أرخص حماية لها.",
      "Contamination is one of the main reasons hydraulic pumps and valves fail, and the filter is the cheapest protection they have.",
    ),
    sections: [
      {
        h: l("ماذا يفعل الفلتر", "What the filter does"),
        body: [
          {
            p: l(
              "يمرّ الزيت الهيدروليكي عبر الفلتر فتبقى فيه جزيئات المعدن والغبار والمطاط. هذه الجزيئات تخدش أسطح المضخة والصمامات وتزيد التسريب الداخلي والحرارة. فلتر نظيف يعني زيتًا نظيفًا وعمرًا أطول للمضخة.",
              "Hydraulic oil passes through the filter, which keeps back particles of metal, dust and rubber. Those particles scratch the surfaces of the pump and valves and increase internal leakage and heat. A clean filter means clean oil and a longer pump life.",
            ),
          },
        ],
      },
      {
        h: l("أنواع الفلاتر في النظام", "Filter types in the system"),
        body: [
          {
            table: {
              head: [l("النوع", "Type"), l("مكانه", "Where it sits"), l("ملاحظة", "Note")],
              rows: [
                [l("فلتر الضغط", "Pressure filter"), l("بعد المضخة، قبل الصمامات.", "After the pump, before the valves."), l("يحمي الصمامات والمشغّلات.", "Protects the valves and actuators.")],
                [l("فلتر الرجوع", "Return filter"), l("على خط الرجوع إلى الخزان.", "On the line returning to the tank."), l("يحجز ما تجمّعه الدورة قبل أن يعود الزيت إلى الخزان.", "Catches what the circuit has collected before the oil goes back to the tank.")],
                [l("مصفاة السحب", "Suction strainer"), l("عند مدخل المضخة داخل الخزان.", "At the pump inlet inside the tank."), l("انسدادها يجوّع المضخة ويسبب ضجيجًا.", "A blocked one starves the pump and causes noise.")],
                [l("فلتر هواء الخزان", "Tank air filter (breather)"), l("على غطاء الخزان.", "On the tank cap."), l("يمنع دخول الغبار مع هواء الخزان.", "Stops dust entering with the air the tank breathes.")],
              ],
            },
          },
        ],
      },
      {
        h: l("علامات الانسداد ومتى تُستبدل", "Signs of clogging and when to replace"),
        body: [
          {
            ul: [
              l("مؤشر الانسداد (إن وُجد) يشير إلى حالة الفلتر.", "The clogging indicator (if fitted) shows the filter's state."),
              l("ضجيج المضخة أو بطء الحركة أو ارتفاع حرارة الزيت. راجع [ارتفاع حرارة الزيت](/guides/hydraulic-oil-overheating-concrete-pump/).", "Pump noise, slow movement or hot oil. See [hydraulic oil overheating](/guides/hydraulic-oil-overheating-concrete-pump/)."),
              l("بعد تلف مضخة أو محرك: استبدل الفلاتر وافحص الزيت، لأن شوائب التلف تدور في النظام.", "After a pump or motor failure: replace the filters and check the oil, because debris from the failure circulates in the system."),
              l("حسب الفاصل في الدليل، وهو الأساس. وضمن [قائمة الصيانة](/guides/concrete-pump-maintenance-checklist/).", "At the manual's interval, which is the baseline, and as part of the [maintenance checklist](/guides/concrete-pump-maintenance-checklist/)."),
            ],
          },
        ],
      },
      {
        h: l("كيف تطلب الفلتر الصحيح", "How to order the right filter"),
        body: [
          {
            ol: [
              l("اقرأ الرقم المطبوع على غلاف الفلتر أو ملصقه، وصوّره.", "Read the number printed on the filter housing or label, and photograph it."),
              l("لاحظ درجة الترشيح إن كانت مكتوبة. في بعض أسماء الكتالوج تظهر مثل «Filter 10U»، وهي عادةً تدل على الترشيح بالميكرون.", "Note the filtration rating if it is written. In some catalogue names it appears as in “Filter 10U”, which usually refers to the rating in microns."),
              l("أرسل ماركة المضخة وموديلها مع الصورة. الأرقام بين القوسين في بعض الأسماء، مثل (294073005)، هي الرقم المرجعي للشركة حين نملكه.", "Send the pump make and model with the photo. Numbers in brackets in some names, such as (294073005), are the maker's reference number where we have it."),
              l("اطلب معه حلقات الإحكام (O-ring) إن لزم. التفاصيل في [كيف تعرف رقم القطعة](/guides/find-part-number/).", "Ask for the sealing O-rings with it if needed. Details in [how to find the part number](/guides/find-part-number/)."),
            ],
          },
        ],
      },
    ],
    codes: ["201010-031", "201010-032", "201010-036", "201010-157", "201010-159", "201010-160"],
    cats: ["filters", "seals"],
    faq: [
      { q: l("هل أنظّف الفلتر وأعيد استعماله؟", "Can I clean a filter and reuse it?"), a: l("يعتمد على النوع. العناصر الورقية وألياف الزجاج تُستبدل ولا تُنظّف، وبعض العناصر المعدنية يسمح الدليل بتنظيفها. اتبع دليل الآلة.", "It depends on the type. Paper and glass-fibre elements are replaced, not cleaned, and some metal elements may be cleaned if the manual allows it. Follow the machine manual.") },
      { q: l("ماذا يعني الرمز 10U في بعض الأسماء؟", "What does 10U mean in some names?"), a: l("عادةً يشير إلى درجة الترشيح بالميكرون. اطلب الفلتر برقمه الكامل وليس بهذه الدرجة وحدها.", "It usually refers to the filtration rating in microns. Order the filter by its full number, not by this rating alone.") },
      { q: l("هل الفلتر نفسه يناسب بوتزمايستر وشوينج؟", "Is the same filter suitable for Putzmeister and Schwing?"), a: l("لا يمكن الافتراض. الأرقام تختلف بين الماركات، فأرسل الرقم أو صورة الفلتر وموديل الآلة.", "You cannot assume so. Numbers differ between makes, so send the number or a photo of the filter and the machine model.") },
      { q: l("هل فلتر جديد يصلح مضخة مزعجة الصوت؟", "Will a new filter fix a noisy pump?"), a: l("أحيانًا إذا كان السبب انسداد السحب أو الفلتر، لكن الضجيج قد يعني أيضًا تآكلًا. افحص الفلاتر أولًا لأنها الأرخص.", "Sometimes, if the cause is a blocked suction strainer or filter, but noise can also mean wear. Check the filters first because they are the cheapest.") },
    ],
  },

  /* ----------------------------------------------------------- pipes */
  {
    slug: "delivery-pipes-elbows-couplings",
    date: DATE,
    cluster: "pumps",
    title: l(
      "أنابيب الضخ والأكواع والوصلات وخرطوم النهاية: كيف تختار وتفحص",
      "Delivery Pipes, Elbows, Couplings and End Hoses: How to Choose and Inspect",
    ),
    desc: l(
      "كيف تطلب وتفحص أنابيب ضخ الخرسانة والأكواع والوصلات (كلامب) وخرطوم النهاية: المقاسات، علامات التآكل، ولماذا الجدار الرقيق خطر.",
      "How to order and inspect concrete delivery pipes, elbows, couplings (clamps) and end hoses: sizes, signs of wear, and why a thin wall is a safety risk.",
    ),
    answer: l(
      "خط الضخ أنابيب وأكواع ووصلات (كلامب) وخرطوم نهاية. اطلب كل قطعة بقطرها الاسمي ونوع الوصلة وسُمك الجدار أو الطول، وافحصها بانتظام لأن الجدار يرقّ من الداخل ولا يظهر ذلك من الخارج. استبدلها قبل أن تتشقق، فالضغط على الخط عالٍ والانفجار خطر على العمال.",
      "A delivery line is pipes, elbows, couplings (clamps) and an end hose. Order each part by its nominal diameter, coupling type and wall thickness or length, and inspect them regularly because the wall thins from the inside and it does not show on the outside. Replace them before they crack: the line is under high pressure and a burst is dangerous for the crew.",
    ),
    intro: l(
      "خط الضخ هو الجزء الذي يلامس الخرسانة طوال المسافة، ولذلك يتآكل في أماكن لا تراها. هذا الدليل يوضح كيف تقيس وتطلب وتفحص.",
      "The delivery line touches the concrete along its whole length, so it wears in places you cannot see. This guide shows how to measure, order and inspect.",
    ),
    sections: [
      {
        h: l("أجزاء الخط", "Parts of the line"),
        body: [
          {
            table: {
              head: [l("الجزء", "Part"), l("ما يميّزه", "What identifies it")],
              rows: [
                [l("أنبوب الضخ", "Delivery pipe"), l("القطر الاسمي (مثل 5.5 أو 6 بوصة)، سُمك الجدار، الطول، نوع الطرف.", "Nominal diameter (such as 5.5 or 6 inch), wall thickness, length and end type.")],
                [l("الكوع (Elbow)", "Elbow"), l("القطر والزاوية ونصف القطر، مثل «Elbow 6\"».", "Diameter, angle and radius, as in “Elbow 6\"”.")],
                [l("الوصلة (Coupling أو Clamp)", "Coupling (clamp)"), l("تربط أنبوبين، وتُحدَّد بقطر الأنبوب ونوع القفل. مثل «Clamp Coupling 6\"».", "Joins two pipes and is sized by pipe diameter and lock type, as in “Clamp Coupling 6\"”.")],
                [l("جلدة الإحكام (Rubber seal)", "Rubber seal (gasket)"), l("تُركَّب داخل الوصلة وتتلف بسرعة، وتُطلب بقطر الأنبوب.", "Sits inside the coupling, wears quickly and is ordered by pipe diameter.")],
                [l("خرطوم النهاية (End hose)", "End hose"), l("الطول ونوع الفلنجة، مثل «End Hose 4 Mtr Double Flg».", "Length and flange type, as in “End Hose 4 Mtr Double Flg”.")],
              ],
            },
          },
        ],
      },
      {
        h: l("كيف تقيس", "How to measure"),
        body: [
          {
            ul: [
              l("القطر الاسمي: بالبوصة أو الملّيمتر (DN)، وهو الاسم الذي تعرفه آلتك.", "Nominal diameter: in inches or millimetres (DN), the size your machine goes by."),
              l("سُمك الجدار والطول ونوع الوصلة. اللَّبس هنا شائع، فصوّر الطرفين.", "Wall thickness, length and coupling type. Mix-ups are common here, so photograph both ends."),
              l("لا تفترض أن وصلة ماركة تناسب أنبوب ماركة أخرى، فتأكد من المطابقة. راجع [كيف تعرف رقم القطعة](/guides/find-part-number/).", "Do not assume one make's coupling fits another make's pipe; confirm the match. See [how to find the part number](/guides/find-part-number/)."),
            ],
          },
        ],
      },
      {
        h: l("علامات التآكل وأمان العمل", "Signs of wear and working safely"),
        body: [
          {
            ul: [
              l("الجدار يرقّ من الداخل بفعل الخرسانة، وقد يبدو الأنبوب سليمًا من الخارج. افحصه بجهاز قياس السُّمك أو انتبه لانتفاخ أو بقع صدأ أو تعرّق عند الأطراف.", "The wall thins from the inside under the concrete, and the pipe may look fine outside. Test it with a thickness gauge, or watch for bulging, rust spots or weeping at the ends."),
              l("تسرّب ملاط من الوصلة يعني جلدة تالفة أو وصلة مرتخية.", "Slurry leaking from a coupling means a worn gasket or a loose coupling."),
              l("الأكواع تتآكل أسرع من الأنابيب المستقيمة لأن الخرسانة تصطدم بجدارها الخارجي.", "Elbows wear faster than straight pipe because the concrete hits their outer wall."),
              l("أنبوب مهترئ تحت الضغط قد ينفجر. استبدله قبل أن يتشقق، ولا تقف بجانب الخط أثناء الضخ.", "A worn pipe under pressure can burst. Replace it before it cracks, and do not stand beside the line while pumping."),
            ],
          },
        ],
      },
      {
        h: l("خرطوم النهاية", "The end hose"),
        body: [
          {
            p: l(
              "خرطوم النهاية يتآكل بسرعة لأنه يتحرك ويحتكّ. لا تستعمله إذا ظهر فيه سلك التسليح أو انتفاخ أو تشقق. اطلبه بالطول ونوع الفلنجة (مفردة أو مزدوجة)، وراجع قسم [الخراطيم](/category/hoses/) و[الأنابيب والوصلات](/category/pipes/). وللقطع الأخرى التي تتآكل راجع [قطع التآكل في مضخة الخرسانة](/guides/pump-wear-parts/).",
              "The end hose wears fast because it moves and rubs. Do not use it once the reinforcement wire shows, or if it bulges or cracks. Order it by length and flange type (single or double), and see [hoses](/category/hoses/) and [pipes and couplings](/category/pipes/). For the other parts that wear, see [concrete pump wear parts](/guides/pump-wear-parts/).",
            ),
          },
        ],
      },
    ],
    codes: ["201010-021", "201010-124", "201010-126", "201010-151", "201010-152", "201010-300"],
    cats: ["pipes", "hoses", "seals"],
    faq: [
      { q: l("ماذا يعني 5.5 و6 بوصة؟", "What do 5.5 and 6 inch mean?"), a: l("هما القطر الاسمي لأنبوب الضخ بالبوصة. الأنبوب والكوع والوصلة يجب أن تتطابق في هذا المقاس.", "They are the nominal diameter of the delivery pipe in inches. The pipe, elbow and coupling must match in this size.") },
      { q: l("كم مرة أستبدل أنابيب الضخ؟", "How often should I replace delivery pipes?"), a: l("لا يوجد موعد ثابت. يعتمد على كمية الخرسانة ونوعها، لذلك الأساس هو القياس والفحص المنتظم لسُمك الجدار.", "There is no fixed date. It depends on the volume and type of concrete, so the basis is regular measurement of the wall thickness.") },
      { q: l("هل خرطوم النهاية قطعة تآكل؟", "Is the end hose a wear part?"), a: l("نعم. يتآكل بسرعة ويجب فحصه واستبداله عند ظهور السلك أو الانتفاخ أو التشقق.", "Yes. It wears quickly and should be inspected and replaced when the wire, a bulge or a crack shows.") },
      { q: l("هل أستعمل وصلة من ماركة مختلفة؟", "Can I use a coupling from a different make?"), a: l("لا تفترض ذلك. تأكد من القطر ونوع القفل ومطابقة الأطراف، وأرسل صورة الأنبوب والوصلة لنؤكد المطابقة.", "Do not assume so. Confirm the diameter, the lock type and the end shapes, and send a photo of the pipe and coupling so we confirm the match.") },
    ],
  },

  /* ------------------------------------------------------------ codes */
  {
    slug: "hydraulic-pump-motor-codes",
    date: DATE,
    cluster: "pumps",
    title: l(
      "رموز المضخات والمحركات الهيدروليكية: كيف تقرأ A10VO وA2FO وA4VTG",
      "Hydraulic Pump and Motor Codes: How to Read A10VO, A2FO and A4VTG",
    ),
    desc: l(
      "كيف تقرأ رموز المضخات والمحركات الهيدروليكية مثل A10VO28 وA2FO23 وA2FM80 وA4VTG90: النوع، الحجم، اتجاه الدوران، ولماذا لا يكفي الاسم المختصر عند الطلب.",
      "How to read hydraulic pump and motor codes such as A10VO28, A2FO23, A2FM80 and A4VTG90: type, size, direction of rotation, and why the short name is not enough when you order.",
    ),
    answer: l(
      "في رمز مثل A10VO28 يدل الجزء الأول على نوع المضخة (مكبسية محورية)، ويدل الرقم بعده على حجمها، أي سعة الإزاحة بالسنتيمتر المكعب في كل دورة. اتجاه الدوران (R يمين أو L يسار) مهم أيضًا. اطلب المضخة بالرمز الكامل من لوحتها لا بالاسم المختصر.",
      "In a code like A10VO28 the first part tells the pump type (axial piston), and the number after it gives the size, meaning the displacement in cubic centimetres per revolution. The direction of rotation (R clockwise, L counter-clockwise) matters too. Order the pump by the full code on its plate, not by the short name.",
    ),
    intro: l(
      "مضخات ومحركات الهيدروليك في مضخات الخرسانة والخلاطات كثيرًا ما تكون من عائلات رموز معروفة. فهم الرمز يجنّبك طلب قطعة بحجم أو اتجاه خطأ.",
      "The hydraulic pumps and motors in concrete pumps and mixers often come from well-known code families. Understanding the code saves you from ordering the wrong size or direction.",
    ),
    sections: [
      {
        h: l("ماذا يقول الرمز", "What the code tells you"),
        body: [
          {
            table: {
              head: [l("الرمز", "Code"), l("ما هو", "What it is"), l("معنى الرقم", "What the number means")],
              rows: [
                [l("A10VO28", "A10VO28"), l("مضخة مكبسية محورية متغيّرة الإزاحة للدورة المفتوحة.", "A variable-displacement axial piston pump for an open circuit."), l("الحجم 28 سم³ لكل دورة (اسميًا).", "Size 28 cm³ per revolution (nominal).")],
                [l("A2FO23", "A2FO23"), l("مضخة مكبسية محورية ثابتة الإزاحة للدورة المفتوحة.", "A fixed-displacement axial piston pump for an open circuit."), l("الحجم 23 سم³ لكل دورة (اسميًا).", "Size 23 cm³ per revolution (nominal).")],
                [l("A2FM80", "A2FM80"), l("محرك هيدروليكي مكبسي ثابت الإزاحة، يُستعمل في أنظمة تدوير الخلاطات.", "A fixed-displacement axial piston hydraulic motor, used in mixer drum drives."), l("الحجم 80 سم³ لكل دورة (اسميًا).", "Size 80 cm³ per revolution (nominal).")],
                [l("A4VTG90", "A4VTG90"), l("مضخة متغيّرة الإزاحة للدورة المغلقة، تُستعمل في تدوير درام الخلاطات.", "A variable-displacement pump for a closed circuit, used to drive mixer drums."), l("الحجم 90 سم³ لكل دورة (اسميًا).", "Size 90 cm³ per revolution (nominal).")],
              ],
            },
          },
          {
            note: l(
              "هذه عائلات رموز لشركة بوش ريكسروث (Bosch Rexroth). عرض رمز في الكتالوج يصف القطعة وحجمها ولا يعني أنها من الشركة المصنّعة نفسها، لذلك اسألنا عن نوع القطعة كما في [الأصلي والبديل](/guides/original-vs-alternative-parts/).",
              "These are code families from Bosch Rexroth. A code shown in the catalogue describes the part and its size and does not by itself mean the part comes from that maker, so ask us about the type as in [original vs alternative](/guides/original-vs-alternative-parts/).",
            ),
          },
        ],
      },
      {
        h: l("اتجاه الدوران", "Direction of rotation"),
        body: [
          {
            p: l(
              "بعد الرمز يأتي حرف R أو L. R تعني دورانًا باتجاه عقارب الساعة، وL عكسها، عند النظر إلى طرف عمود الإدارة. مضختان بالحجم نفسه لكن باتجاهين مختلفين لا تتبادلان. في الكتالوج ستجد أسماء مثل «Hydraulic Pump R A10VO28» و«Hydraulic Pump L A10VO28».",
              "After the code comes an R or an L. R means clockwise rotation and L the opposite, looking at the end of the drive shaft. Two pumps of the same size but different directions do not swap. In the catalogue you will see names such as “Hydraulic Pump R A10VO28” and “Hydraulic Pump L A10VO28”.",
            ),
          },
        ],
      },
      {
        h: l("لماذا لا يكفي الاسم المختصر", "Why the short name is not enough"),
        body: [
          {
            ul: [
              l("الرمز الكامل على اللوحة أطول من الاسم المختصر، وفيه حروف للسلسلة ونوع التحكّم والعمود والوصلات.", "The full code on the plate is longer than the short name, with letters for series, control type, shaft and ports."),
              l("مضختان بالحجم نفسه وحروف مختلفة في النهاية قد لا تتبادلان في التثبيت أو التحكم.", "Two pumps of the same size with different end letters may not swap in mounting or control."),
              l("لا تستبدل A10VO28 بـ A10VO18 ولا العكس: الحجم يتغيّر فيتغيّر التدفق وعزم المحرك.", "Do not swap A10VO28 for A10VO18 or the reverse: the size changes, so the flow and drive torque change."),
              l("صوّر اللوحة كاملة وأرسلها كما في [كيف تعرف رقم القطعة](/guides/find-part-number/).", "Photograph the whole plate and send it as in [how to find the part number](/guides/find-part-number/)."),
            ],
          },
        ],
      },
      {
        h: l("ما بعد الشراء", "After you buy"),
        body: [
          {
            p: l(
              "إذا ارتفعت حرارة النظام أو ضعف الضخ فلا تشتري مضخة قبل أن تُثبت الفحوص أنها السبب. ابدأ من [ضعف الضخ](/guides/concrete-pump-slow-weak-output/) و[ارتفاع حرارة الزيت](/guides/hydraulic-oil-overheating-concrete-pump/). وأطقم أختام المحركات تجدها في قسم [الأختام](/category/seals/) وليس بالضرورة أن تحتاج مضخة جديدة.",
              "If the system runs hot or the pump is weak, do not buy a pump until checks show it is the cause. Start with [slow or weak output](/guides/concrete-pump-slow-weak-output/) and [hydraulic oil overheating](/guides/hydraulic-oil-overheating-concrete-pump/). Motor seal kits are under [seals](/category/seals/), and you may not need a new pump.",
            ),
          },
        ],
      },
    ],
    codes: ["201010-171", "201010-489", "201010-487", "201010-511", "201010-513", "201010-856"],
    cats: ["pumps", "seals", "valves"],
    faq: [
      { q: l("ماذا يعني الرقم في A10VO28؟", "What does the number in A10VO28 mean?"), a: l("هو حجم المضخة، أي سعة الإزاحة الاسمية بالسنتيمتر المكعب في كل دورة. هنا 28.", "It is the pump size, the nominal displacement in cubic centimetres per revolution. Here it is 28.") },
      { q: l("ما الفرق بين R وL؟", "What is the difference between R and L?"), a: l("R دوران باتجاه عقارب الساعة وL عكس عقارب الساعة، عند النظر إلى طرف العمود. اطلب الاتجاه نفسه الموجود على مضختك.", "R is clockwise and L is counter-clockwise, looking at the shaft end. Order the same direction as on your pump.") },
      { q: l("هل أركّب A10VO28 مكان A10VO18؟", "Can I fit an A10VO28 in place of an A10VO18?"), a: l("لا. الحجم مختلف فيتغيّر التدفق والعزم، وقد يختلف التثبيت والتحكّم أيضًا.", "No. The size is different, so flow and torque change, and the mounting and control may differ too.") },
      { q: l("أين أجد لوحة المضخة؟", "Where is the pump's data plate?"), a: l("لوحة صغيرة على جسم المضخة أو المحرك. إذا مُحيت الأرقام فأرسل صورة القطعة وماركة الآلة وموديلها ونحدد لك المناسب.", "A small plate on the pump or motor body. If the numbers have worn off, send a photo of the part and the machine make and model and we identify the right one.") },
    ],
  },
];
