import { SITE, type Lang } from "./site";

// Buying guides. Every fact is either general technical knowledge of concrete pumps or already stated on the site
// (hours, address, delivery inside and outside Riyadh, prices on request). No warranty terms, delivery times,
// prices or "genuine" claims about specific parts are made: those are for the owner to confirm first.

type L = Record<Lang, string>;
export type Block = { p?: L; ul?: L[]; ol?: L[] };
export type Section = { h: L; body: Block[] };
export type Guide = {
  slug: string;
  date: string; // ISO date first published
  title: L;
  desc: L; // meta description
  intro: L;
  sections: Section[];
  /** Real catalogue parts shown as examples under the guide. */
  codes: string[];
  /** Category pages to link to. */
  cats: string[];
  /** Short question and answer pairs, also published as FAQPage structured data. */
  faq: { q: L; a: L }[];
};

const wa = SITE.phoneDisplay;

export const GUIDES: Guide[] = [
  /* ------------------------------------------------------------------ 1 */
  {
    slug: "find-part-number",
    date: "2026-11-06",
    title: {
      ar: "كيف تعرف رقم قطعة غيار مضخة الخرسانة", // How to find the part number of a concrete pump spare part
      en: "How to Find the Part Number of a Concrete Pump Spare Part",
    },
    desc: {
      ar: "أين تجد رقم القطعة على مضخة الخرسانة والخلاطة، وكيف تقيسها إذا لم يكن عليها رقم، وماذا ترسل لنا على واتساب لنحدد القطعة المناسبة.", // Where to find the part number on a concrete pump or mixer, how to measure it if there is no number, and what to send us on WhatsApp so we identify the right part.
      en: "Where to find the part number on a concrete pump or mixer, how to measure a part that has none, and what to send us on WhatsApp.",
    },
    intro: {
      ar: "رقم القطعة الصحيح يوفّر عليك طلبًا خاطئًا ورحلة ثانية. هذا الدليل يوضح أين تبحث عن الرقم على مضخة الخرسانة أو شاحنة الخلاطة أو محطة الخلط، وماذا تفعل إذا لم تجده.", // The right part number saves you a wrong order and a second trip. This guide shows where to look for the number on a concrete pump, truck mixer or batching plant, and what to do if you cannot find it.
      en: "The right part number saves you a wrong order and a second trip. This guide shows where to look for the number on a concrete pump, truck mixer or batching plant, and what to do if you cannot find it.",
    },
    sections: [
      {
        h: { ar: "ابدأ بالآلة قبل القطعة", /* Start with the machine, before the part */ en: "Start with the machine, not the part" },
        body: [
          {
            ul: [
              {
                ar: "ابحث عن لوحة البيانات (اللوحة المعدنية) على الآلة. فيها الماركة والموديل والرقم التسلسلي. صوّرها كاملة وبوضوح.", // Find the data plate (the metal plate) on the machine. It has the make, model and serial number. Photograph all of it, clearly.
                en: "Find the data plate (the metal nameplate) on the machine. It gives the make, model and serial number. Photograph all of it, clearly.",
              },
              {
                ar: "كثير من القطع تختلف من سنة موديل إلى أخرى، والرقم التسلسلي هو الذي يحدد النسخة التي عندك.", // Many parts differ between model years, and the serial number settles which version you have.
                en: "Many parts differ between model years, and the serial number settles which version you have.",
              },
              {
                ar: "اكتب اسم القطعة وموضعها في الآلة، مثل: محمل المقلّب، صمام S، أسطوانة الضخ، محرك هيدروليكي.", // Write the name of the part and where it sits on the machine, e.g. agitator bearing, S-valve, delivery cylinder, hydraulic motor.
                en: "Write down the name of the part and where it sits on the machine, for example agitator bearing, S-valve, delivery cylinder or hydraulic motor.",
              },
            ],
          },
        ],
      },
      {
        h: { ar: "أين يكون الرقم على القطعة نفسها", /* Where the number is on the part itself */ en: "Where the number is on the part itself" },
        body: [
          {
            ul: [
              {
                ar: "المحامل (الرولمان): الرقم الطرازي مطبوع أو منقوش على الحلقة من الجانب، وبجانبه شعار الشركة المصنّعة.", // Bearings: the series number is printed or stamped on the ring, on the side face, next to the maker's mark.
                en: "Bearings: the series number is printed or stamped on the side face of the ring, next to the maker's mark.",
              },
              {
                ar: "المضخات والمحركات الهيدروليكية: لوحة صغيرة على الجسم فيها رمز الطراز، مثل A4VTG90 على مضخة الشحن.", // Hydraulic pumps and motors: a small plate on the body carries the type code, such as A4VTG90 on a charge pump.
                en: "Hydraulic pumps and motors: a small plate on the housing carries the type code, such as A4VTG90 on a charge pump.",
              },
              {
                ar: "الفلاتر: الرقم على الغلاف أو على الملصق.", // Filters: the number is on the housing or on the label.
                en: "Filters: the number is on the housing or on the label.",
              },
              {
                ar: "القطع المصبوبة والفولاذية مثل لوحة التآكل وحلقة القطع والأكواع: قد يكون عليها رقم منقوش، وإذا تآكل نعتمد على المقاسات أو كتالوج الآلة.", // Cast and steel parts such as the wear plate, cutting ring and elbows: there may be a stamped number; if it has worn off we go by the dimensions or the machine's parts book.
                en: "Cast and steel parts such as the wear plate, cutting ring and elbows: there may be a stamped number. If it has worn off, we go by the dimensions or the machine's parts book.",
              },
            ],
          },
        ],
      },
      {
        h: { ar: "إذا لم يكن عليها رقم: قِس القطعة", /* If there is no number, measure the part */ en: "If there is no number, measure the part" },
        body: [
          {
            ul: [
              {
                ar: "حلقات O والأختام: القطر الداخلي × سُمك المقطع بالملّيمتر. مثلًا «O Ring 235X5» يعني قطرًا داخليًا 235 مم وسُمكًا 5 مم.", // O-rings and seals: inner diameter × cross-section in millimetres. For example "O Ring 235X5" means 235 mm inside diameter and 5 mm thick.
                en: "O-rings and seals: inner diameter × cross-section in millimetres. For example, “O Ring 235X5” means 235 mm inside diameter and 5 mm thick.",
              },
              {
                ar: "حلقة القطع والمكبس وأسطوانة الضخ: القطر الاسمي (مثل DN 230) والطول (مثل أسطوانة 230×2100).", // Cutting ring, piston and delivery cylinder: the nominal diameter (such as DN 230) and the length (such as a 230×2100 cylinder).
                en: "Cutting ring, piston and delivery cylinder: the nominal diameter (such as DN 230) and the length (such as a 230×2100 cylinder).",
              },
              {
                ar: "أنابيب الضخ والأكواع والخراطيم: القطر الاسمي أو البوصة (مثل 6 بوصة) وسُمك الجدار والطول ونوع الوصلة.", // Delivery pipes, elbows and hoses: the nominal size or inches (such as 6"), wall thickness, length and coupling type.
                en: "Delivery pipes, elbows and hoses: the nominal size or inches (such as 6\"), the wall thickness, the length and the coupling type.",
              },
            ],
          },
        ],
      },
      {
        h: { ar: "رقم الكتالوج عندنا والرقم المرجعي (OEM)", /* Our catalogue code and the OEM reference number */ en: "Our catalogue code and the OEM reference number" },
        body: [
          {
            p: {
              ar: "لكل قطعة في موقعنا رقم خاص بنا (مثل 201010-064)، وحيث يتوفر نعرض أيضًا الرقم المرجعي (OEM) الخاص بالشركة المصنّعة للآلة. صندوق البحث في الكتالوج يقبل أيًّا منهما أو الاسم.", // Every part on our site has our own code (such as 201010-064) and, where we have it, the OEM reference number of the machine maker. The catalogue search box accepts either one, or the name.
              en: "Every part on our site has our own code (such as 201010-064) and, where we have it, the OEM reference number of the machine maker. The catalogue search box accepts either one, or the name.",
            },
          },
        ],
      },
      {
        h: { ar: "ماذا ترسل لنا على واتساب", /* What to send us on WhatsApp */ en: "What to send us on WhatsApp" },
        body: [
          {
            ol: [
              { ar: "صورة لوحة بيانات الآلة.", /* A photo of the machine's data plate. */ en: "A photo of the machine's data plate." },
              { ar: "صورتان للقطعة القديمة من زاويتين، تظهر فيهما أي أرقام عليها.", /* Two photos of the old part from different angles, showing any numbers on it. */ en: "Two photos of the old part from different angles, showing any numbers on it." },
              { ar: "ماركة الآلة وموديلها وسنة الصنع.", /* The machine's make, model and year. */ en: "The machine's make, model and year." },
              { ar: "المقاسات التي قستها، إن وُجدت.", /* The dimensions you measured, if you have them. */ en: "The dimensions you measured, if you have them." },
              { ar: "الكمية المطلوبة والمدينة التي تريد التوصيل إليها.", /* The quantity and the city for delivery. */ en: "The quantity and the city you want it delivered to." },
            ],
          },
          {
            p: {
              ar: `أرسلها على واتساب ${wa} ونحدد لك القطعة المناسبة ونرد عليك بالسعر والتوفر.`, // Send them on WhatsApp and we identify the right part and reply with price and availability.
              en: `Send them on WhatsApp at ${wa} and we identify the right part and reply with the price and availability.`,
            },
          },
        ],
      },
    ],
    codes: ["201010-064", "201010-598", "201010-237", "201010-124", "201010-012"],
    cats: ["seals", "bearings", "pipes", "pistons"],
    faq: [
      {
        q: { ar: "ما عندي رقم القطعة، كيف أطلبها؟", /* I do not have the part number, how do I order it? */ en: "I do not have the part number. How do I order?" },
        a: {
          ar: "صوّر لوحة بيانات الآلة والقطعة القديمة وأرسلهما على واتساب، ونحدد لك القطعة المناسبة.", // Photograph the machine's data plate and the old part and send them on WhatsApp; we identify the right part.
          en: "Photograph the machine's data plate and the old part and send them on WhatsApp. We identify the right part for you.",
        },
      },
      {
        q: { ar: "ما الفرق بين رقم الكتالوج والرقم المرجعي (OEM)؟", /* What is the difference between the catalogue code and the OEM reference number? */ en: "What is the difference between your code and the OEM reference number?" },
        a: {
          ar: "رقم الكتالوج هو رقمنا الخاص لكل قطعة. الرقم المرجعي (OEM) هو رقم الشركة المصنّعة للآلة، ونعرضه حيث يتوفر.", // The catalogue code is our own number for each part. The OEM reference number is the machine maker's number, shown where we have it.
          en: "The catalogue code is our own number for each part. The OEM reference number is the machine maker's number, shown where we have it.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ 2 */
  {
    slug: "pump-wear-parts",
    date: "2026-11-06",
    title: {
      ar: "قطع التآكل في مضخة الخرسانة: ماذا يتآكل ومتى تُستبدل", // Concrete pump wear parts: what wears out and when to replace it
      en: "Concrete Pump Wear Parts: What Wears Out and When to Replace It",
    },
    desc: {
      ar: "أهم قطع التآكل في مضخة الخرسانة: لوحة النظارة وحلقة القطع وصمام S والمكابس والأنابيب والأكواع. علامات التآكل وما الذي يُستبدل معًا.", // The main wear parts of a concrete pump: spectacle plate, cutting ring, S-valve, pistons, pipes and elbows. Signs of wear and what is replaced together.
      en: "The main wear parts of a concrete pump: spectacle plate, cutting ring, S-valve, pistons, pipes and elbows. Signs of wear and what to replace together.",
    },
    intro: {
      ar: "الخرسانة مادة كاشطة، وبعض قطع المضخة تتآكل بحكم عملها. معرفة هذه القطع وعلامات تآكلها تساعدك على الاستبدال قبل أن تتوقف المضخة في الموقع.", // Concrete is abrasive, and some pump parts wear out by design. Knowing these parts and the signs of wear helps you replace them before the pump stops on site.
      en: "Concrete is abrasive, and some pump parts wear out by design. Knowing these parts and the signs of wear helps you replace them before the pump stops on site.",
    },
    sections: [
      {
        h: { ar: "كيف تعمل وحدة الضخ باختصار", /* How the pumping end works, in short */ en: "How the pumping end works, in short" },
        body: [
          {
            p: {
              ar: "في أغلب المضخات المركّبة على الشاحنات، يسحب مكبس في أسطوانة الضخ الخرسانة من القادوس، بينما يتحرك صمام S ليوصّل الأسطوانة الأخرى بخط الضخ. لوحة النظارة وحلقة القطع عند مخرج القادوس يختم عليهما صمام S أثناء حركته، فهما أكثر القطع احتكاكًا.", // In most truck-mounted pumps, a piston in one delivery cylinder draws concrete from the hopper while the S-valve swings to connect the other cylinder to the delivery line. The spectacle plate and cutting ring at the hopper outlet are what the S-valve seals against as it moves, so they take the most rubbing.
              en: "In most truck-mounted pumps, a piston in one delivery cylinder draws concrete from the hopper while the S-valve swings to connect the other cylinder to the delivery line. The spectacle plate and cutting ring at the hopper outlet are what the S-valve seals against as it moves, so they take the most rubbing.",
            },
          },
        ],
      },
      {
        h: { ar: "القطع التي تتآكل", /* The parts that wear out */ en: "The parts that wear out" },
        body: [
          {
            ul: [
              {
                ar: "لوحة النظارة (لوحة التآكل) وحلقة القطع: تُستبدلان عادةً معًا.", // Spectacle plate (wear plate) and cutting ring: normally replaced together.
                en: "Spectacle plate (wear plate) and cutting ring: normally replaced together.",
              },
              {
                ar: "صمام S: يتآكل من الداخل بمرور الخرسانة، ويُفحص سُمك جداره.", // S-valve: wears from the inside as concrete passes through; check the wall thickness.
                en: "S-valve: wears from the inside as concrete passes through, so check its wall thickness.",
              },
              {
                ar: "مكابس الضخ وحلقاتها المطاطية وأسطوانات الضخ: تتآكل الحلقات ويظهر خدش على جدار الأسطوانة.", // Delivery pistons, their rubber rings and the delivery cylinders: the rings wear and scoring appears on the cylinder wall.
                en: "Delivery pistons, their rubber rings and the delivery cylinders: the rings wear and scoring appears on the cylinder wall.",
              },
              {
                ar: "أنابيب الضخ والأكواع وخرطوم النهاية: يرقّ الجدار أكثر عند الأكواع، ويتآكل خرطوم النهاية عند طرف التفريغ.", // Delivery pipes, elbows and the end hose: the wall thins most at the bends, and the end hose wears at the discharge end.
                en: "Delivery pipes, elbows and the end hose: the wall thins most at the bends, and the end hose wears at the discharge end.",
              },
              {
                ar: "الأختام والمحامل في المقلّب ومفصل صمام S والأسطوانات الهيدروليكية.", // Seals and bearings in the agitator, the S-valve swing joint and the hydraulic cylinders.
                en: "Seals and bearings in the agitator, the S-valve swing joint and the hydraulic cylinders.",
              },
            ],
          },
        ],
      },
      {
        h: { ar: "علامات أن الوقت حان", /* Signs that it is time */ en: "Signs that it is time" },
        body: [
          {
            ul: [
              { ar: "انخفاض كمية الخرسانة المضخوخة أو بطء بناء الضغط.", /* Less concrete pumped, or pressure that builds slowly. */ en: "Less concrete pumped, or pressure that builds slowly." },
              { ar: "تسرب خرسانة أو ملاط حول مخرج القادوس وحلقة القطع.", /* Concrete or slurry leaking around the hopper outlet and cutting ring. */ en: "Concrete or slurry leaking around the hopper outlet and cutting ring." },
              { ar: "ماء حوض الماء يصير عكرًا أو رماديًا: الإسمنت يمر من حلقات المكبس المتآكلة.", /* Water in the water box turns cloudy or grey: cement is passing a worn piston ring. */ en: "Water in the water box turns cloudy or grey: cement is getting past a worn piston ring." },
              { ar: "خدوش أو أخاديد على جدار أسطوانة الضخ.", /* Scores or grooves on the delivery cylinder wall. */ en: "Scores or grooves on the delivery cylinder wall." },
              { ar: "حركة صمام S خشنة أو متقطعة أو مصحوبة بصوت احتكاك.", /* A rough or jerky S-valve swing, or a grinding noise. */ en: "A rough or jerky S-valve swing, or a grinding noise." },
              { ar: "أنابيب أو أكواع بها نقاط رقيقة أو انتفاخ أو تسرب.", /* Pipes or elbows with thin spots, bulges or leaks. */ en: "Pipes or elbows with thin spots, bulges or leaks." },
            ],
          },
        ],
      },
      {
        h: { ar: "ما الذي يسرّع التآكل", /* What makes parts wear faster */ en: "What makes parts wear faster" },
        body: [
          {
            ul: [
              { ar: "الخلطة: الركام الخشن والحاد يكشط أكثر.", /* The mix: coarse, sharp aggregate scrapes more. */ en: "The mix: coarse, sharp aggregate scrapes more." },
              { ar: "ضغط الضخ والمسافة الطويلة.", /* Pumping pressure and long distances. */ en: "Pumping pressure and long distances." },
              { ar: "الغسيل بعد العمل وتغيير ماء حوض الماء بانتظام.", /* Washing out after work and changing the water box water regularly. */ en: "How well the pump is washed out after work and how often the water box water is changed." },
              { ar: "ترك قطعة متآكلة في الخدمة: حلقة القطع المتآكلة مثلًا تتلف لوحة النظارة.", /* Leaving a worn part in service: a worn cutting ring, for example, damages the wear plate. */ en: "Leaving a worn part in service: a worn cutting ring, for example, damages the wear plate." },
            ],
          },
          {
            p: {
              ar: "عمر القطعة يختلف كثيرًا حسب هذه العوامل، لذلك نفضّل الفحص الدوري على الاعتماد على عدد ساعات ثابت.", // Part life varies a lot with these factors, so regular inspection is better than relying on a fixed number of hours.
              en: "Part life varies a lot with these factors, so regular inspection is better than relying on a fixed number of hours.",
            },
          },
        ],
      },
      {
        h: { ar: "اطلب الطقم لا القطعة الواحدة", /* Order the set, not a single part */ en: "Order the set, not a single part" },
        body: [
          {
            ul: [
              { ar: "عند تغيير لوحة النظارة بدّل حلقة القطع معها.", /* When you change the spectacle plate, change the cutting ring with it. */ en: "When you change the spectacle plate, change the cutting ring with it." },
              { ar: "بدّل حلقات المكبسين معًا حتى يتساوى الأداء.", /* Change the rings of both pistons together so they perform equally. */ en: "Change the rings of both pistons together so they perform equally." },
              { ar: "إذا فتحت الوحدة، افحص أختام ومحامل صمام S والمقلّب في نفس الوقت.", /* If you have the unit open, check the S-valve and agitator seals and bearings at the same time. */ en: "If you have the unit open, check the S-valve and agitator seals and bearings at the same time." },
            ],
          },
          {
            p: {
              ar: `أرسل أرقام القطع أو صورها على واتساب ${wa} لنرد عليك بالسعر والتوفر.`, // Send the part numbers or photos on WhatsApp and we reply with price and availability.
              en: `Send the part numbers or photos on WhatsApp at ${wa} and we reply with the price and availability.`,
            },
          },
        ],
      },
    ],
    codes: ["201010-064", "201010-007", "201010-100", "201010-132", "201010-237", "201010-124", "201010-301"],
    cats: ["wear", "pistons", "pipes", "seals"],
    faq: [
      {
        q: { ar: "هل أبدّل لوحة النظارة وحلقة القطع معًا؟", /* Should I replace the spectacle plate and cutting ring together? */ en: "Should I replace the spectacle plate and cutting ring together?" },
        a: {
          ar: "عادةً نعم. حلقة القطع المتآكلة تتلف لوحة النظارة الجديدة، فيُستبدلان معًا.", // Usually yes. A worn cutting ring damages a new spectacle plate, so they are replaced together.
          en: "Usually yes. A worn cutting ring damages a new spectacle plate, so they are replaced together.",
        },
      },
      {
        q: { ar: "كيف أعرف أن حلقات المكبس تآكلت؟", /* How do I know the piston rings are worn? */ en: "How do I know the piston rings are worn?" },
        a: {
          ar: "إذا صار ماء حوض الماء عكرًا أو رماديًا فالإسمنت يمر من الحلقات، وهذه علامة على التآكل.", // If the water box water turns cloudy or grey, cement is passing the rings, which is a sign of wear.
          en: "If the water box water turns cloudy or grey, cement is getting past the rings. That is a sign of wear.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ 3 */
  {
    slug: "original-vs-alternative-parts",
    date: "2026-11-06",
    title: {
      ar: "قطع الغيار الأصلية والبديلة: ماذا تتأكد منه قبل الشراء", // Original and alternative spare parts: what to check before you buy
      en: "Original vs Alternative Spare Parts: What to Check Before You Buy",
    },
    desc: {
      ar: "الفرق بين قطع الغيار الأصلية والبديلة لمعدات الخرسانة، وما تتأكد منه في الحالتين، ومتى يناسبك كل نوع.", // The difference between original and alternative spare parts for concrete equipment, what to check in both cases, and when each one suits you.
      en: "The difference between original and alternative spare parts for concrete equipment, what to check in both cases, and when each suits you.",
    },
    intro: {
      ar: "عند شراء قطعة غيار لمعدات الخرسانة ستسمع كلمتي «أصلي» و«بديل». اختيار النوع المناسب يعتمد على القطعة وعلى طبيعة العمل. هذا الدليل يشرح المصطلحات وما يجب فحصه قبل الدفع، أيًّا كان البائع.", // When buying a spare part for concrete equipment you will hear the words "original" and "alternative". Choosing the right type depends on the part and the job. This guide explains the terms and what to check before you pay, whoever the seller is.
      en: "When you buy a spare part for concrete equipment you will hear the words “original” and “alternative”. Choosing the right type depends on the part and on the job. This guide explains the terms and what to check before you pay, whoever the seller is.",
    },
    sections: [
      {
        h: { ar: "ماذا تعني الكلمات", /* What the words mean */ en: "What the words mean" },
        body: [
          {
            ul: [
              {
                ar: "قطعة أصلية (OEM): تصنعها الشركة المصنّعة للآلة أو تصنع لها، وتحمل رقمها المرجعي.", // Original (OEM) part: made by, or for, the machine maker and carrying the maker's reference number.
                en: "Original (OEM) part: made by, or for, the machine maker and carrying the maker's reference number.",
              },
              {
                ar: "قطعة بديلة (متوافقة): تصنعها شركة أخرى لتركَّب على نفس الآلة. قد يكون لها رقم خاص بها، وتتفاوت جودتها كثيرًا من مصنّع لآخر.", // Alternative (compatible) part: made by another company to fit the same machine. It may have its own number, and quality varies a lot from one maker to another.
                en: "Alternative (compatible) part: made by another company to fit the same machine. It may have its own number, and quality varies a lot from one maker to another.",
              },
            ],
          },
        ],
      },
      {
        h: { ar: "ما تتأكد منه في الحالتين", /* What to check in both cases */ en: "What to check in both cases" },
        body: [
          {
            ul: [
              { ar: "تطابق رقم القطعة أو المقاسات مع القطعة القديمة.", /* The part number or dimensions match the old part. */ en: "The part number or dimensions match the old part." },
              { ar: "المادة: في قطع التآكل مثل لوحة النظارة وحلقة القطع تحدد صلادة المعدن عمر القطعة، فاسأل عن المادة.", /* Material: in wear parts such as the spectacle plate and cutting ring, the hardness of the metal sets the part's life, so ask about the material. */ en: "Material: in wear parts such as the spectacle plate and cutting ring, the hardness of the metal sets the part's life, so ask about the material." },
              { ar: "نوع الأختام ومادتها ومقاسها الدقيق.", /* Seal type, material and exact size. */ en: "Seal type, material and exact size." },
              { ar: "بلد الصنع والماركة وعلامات التغليف.", /* Country of manufacture, brand and packaging marks. */ en: "Country of manufacture, brand and packaging marks." },
              { ar: "اسأل قبل الدفع ماذا يحدث إذا لم تناسب القطعة، واطلب الشروط واضحة.", /* Ask before you pay what happens if the part does not fit, and get the terms clearly. */ en: "Ask before you pay what happens if the part does not fit, and get the terms clearly." },
            ],
          },
        ],
      },
      {
        h: { ar: "أيهما يناسبك", /* Which one suits you */ en: "Which one suits you" },
        body: [
          {
            p: {
              ar: "هذه إرشادات عامة وليست قاعدة ثابتة:", // These are general guidelines, not a fixed rule:
              en: "These are general guidelines, not a fixed rule:",
            },
          },
          {
            ul: [
              {
                ar: "الأجزاء الداخلية للمضخات والمحركات الهيدروليكية ووحدات التحكم: الأصلي أضمن ما لم يثبت لك بديل موثوق لهذه القطعة تحديدًا.", // Internals of hydraulic pumps and motors and control units: original is the safer choice unless you have a proven alternative for that exact part.
                en: "Internals of hydraulic pumps and motors, and control units: original is the safer choice unless you have a proven alternative for that exact part.",
              },
              {
                ar: "القطع المستهلكة مثل الأنابيب والخراطيم والفلاتر وحلقات O: توجد بدائل جيدة كثيرة، والمقارنة بين السعر والعمر المتوقع هي المعيار.", // Consumables such as pipes, hoses, filters and O-rings: there are many good alternatives, and the comparison is price against expected life.
                en: "Consumables such as pipes, hoses, filters and O-rings: there are many good alternatives, and the comparison is price against expected life.",
              },
              {
                ar: "قطع التآكل: قارن الصلادة والمادة وليس السعر وحده، فالقطعة الأرخص التي تتآكل أسرع قد تكلفك أكثر.", // Wear parts: compare hardness and material, not price alone; a cheaper part that wears faster can cost you more.
                en: "Wear parts: compare hardness and material, not price alone. A cheaper part that wears out faster can cost you more.",
              },
            ],
          },
        ],
      },
      {
        h: { ar: "عندما تطلب السعر منا", /* When you ask us for a price */ en: "When you ask us for a price" },
        body: [
          {
            p: {
              ar: `اذكر في رسالتك هل تحتاج قطعة الشركة المصنّعة نفسها أم يكفيك بديل متوافق، وراجع في الرد ماركة القطعة وبلد صنعها قبل التأكيد. أرسل رقم القطعة أو صورتها على واتساب ${wa}.`, // In your message say whether you need the machine maker's own part or a compatible alternative is enough, and check the part's brand and country of manufacture in the reply before confirming. Send the part number or a photo on WhatsApp.
              en: `In your message, say whether you need the machine maker's own part or whether a compatible alternative is enough, and check the part's brand and country of manufacture in the reply before you confirm. Send the part number or a photo on WhatsApp at ${wa}.`,
            },
          },
        ],
      },
    ],
    codes: ["201010-085", "201010-102", "201010-007", "201010-644", "201010-300"],
    cats: ["wear", "seals", "filters", "hoses"],
    faq: [
      {
        q: { ar: "هل القطعة البديلة مثل الأصلية؟", /* Is an alternative part as good as the original? */ en: "Is an alternative part as good as the original?" },
        a: {
          ar: "يختلف ذلك بالقطعة والمصنّع. في قطع التآكل قارن المادة والصلادة، وفي الأجزاء الهيدروليكية الداخلية الأصلي أضمن عادةً.", // It depends on the part and the maker. For wear parts compare material and hardness; for internal hydraulic parts the original is usually the safer choice.
          en: "It depends on the part and the maker. For wear parts compare material and hardness; for internal hydraulic parts the original is usually the safer choice.",
        },
      },
      {
        q: { ar: "كيف أفرّق بين القطعة الأصلية والبديلة؟", /* How do I tell an original part from an alternative one? */ en: "How do I tell an original part from an alternative one?" },
        a: {
          ar: "الأصلية تحمل رقم الشركة المصنّعة للآلة وتغليفها. إذا كنت غير متأكد فاسأل البائع صراحةً عن مصدر القطعة.", // The original carries the machine maker's number and packaging. If you are unsure, ask the seller directly where the part comes from.
          en: "An original part carries the machine maker's number and packaging. If you are unsure, ask the seller directly where the part comes from.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ 4 */
  {
    slug: "how-to-order",
    date: "2026-11-06",
    title: {
      ar: "كيف تطلب قطع الغيار من بيت المنتج في الرياض", // How to order spare parts from Product House in Riyadh
      en: "How to Order Spare Parts from Product House in Riyadh",
    },
    desc: {
      ar: "خطوات طلب قطع غيار مضخات الخرسانة والخلاطات من مؤسسة بيت المنتج للتجارة في الرياض: السعر على واتساب، التوصيل، أوقات الدوام والموقع.", // Steps to order concrete pump and mixer spare parts from Product House Trading Est. in Riyadh: price on WhatsApp, delivery, opening hours and location.
      en: "How to order concrete pump and mixer spare parts from Product House Trading Est. in Riyadh: price on WhatsApp, delivery, opening hours and location.",
    },
    intro: {
      ar: "لا نعرض الأسعار على الموقع، ونرد بالسعر عند الطلب. هذه خطوات الطلب من أول رسالة إلى استلام القطعة.", // We do not show prices on the site; we reply with the price on request. These are the steps from your first message to receiving the part.
      en: "We do not publish prices on the site; we reply with the price on request. These are the steps from your first message to receiving the part.",
    },
    sections: [
      {
        h: { ar: "خطوات الطلب", /* Steps to order */ en: "Steps to order" },
        body: [
          {
            ol: [
              {
                ar: "ابحث في الكتالوج بالاسم أو بالرقم، أو اختر آلتك من صفحة «الآلات والعلامات». إن لم تجد القطعة فصوّرها فقط.", // Search the catalogue by name or number, or pick your machine on the Machines page. If you cannot find the part, just photograph it.
                en: "Search the catalogue by name or number, or pick your machine on the Machines page. If you cannot find the part, just photograph it.",
              },
              {
                ar: `أرسل رقم القطعة أو صورتها على واتساب ${wa}. يمكنك أيضًا تجميع عدة قطع في قائمة طلب السعر على الموقع وإرسالها برسالة واحدة.`, // Send the part number or a photo on WhatsApp. You can also collect several parts in the price-request list on the site and send them in one message.
                en: `Send the part number or a photo on WhatsApp at ${wa}. You can also collect several parts in the price-request list on the site and send them in one message.`,
              },
              {
                ar: "نرد عليك بالسعر والتوفر.", // We reply with the price and availability.
                en: "We reply with the price and availability.",
              },
              {
                ar: "تؤكد الطلب ونتفق على الاستلام من المحل أو التوصيل.", // You confirm the order and we agree on collection from the shop or delivery.
                en: "You confirm the order and we agree on collection from the shop or delivery.",
              },
            ],
          },
        ],
      },
      {
        h: { ar: "التوصيل", /* Delivery */ en: "Delivery" },
        body: [
          {
            p: {
              ar: "نوفّر التوصيل داخل الرياض وخارجها. اكتب لنا المدينة على واتساب لنؤكد لك الطريقة.", // We deliver inside and outside Riyadh. Tell us the city on WhatsApp and we confirm how.
              en: "We deliver inside and outside Riyadh. Tell us your city on WhatsApp and we confirm how.",
            },
          },
        ],
      },
      {
        h: { ar: "الموقع وأوقات الدوام", /* Location and opening hours */ en: "Location and opening hours" },
        body: [
          {
            ul: [
              { ar: `العنوان: ${SITE.address.ar}.`, /* Address */ en: `Address: ${SITE.address.en}.` },
              { ar: `الدوام: ${SITE.hours.ar}.`, /* Opening hours */ en: `Opening hours: ${SITE.hours.en}.` },
              { ar: `الهاتف وواتساب: ${wa}.`, /* Phone and WhatsApp */ en: `Phone and WhatsApp: ${wa}.` },
            ],
          },
        ],
      },
      {
        h: { ar: "بيانات المؤسسة", /* Business details */ en: "Business details" },
        body: [
          {
            p: {
              ar: `مؤسسة بيت المنتج للتجارة، السجل التجاري ${SITE.cr}، الرقم الضريبي ${SITE.vat}.`, // Product House Trading Est., commercial registration {cr}, VAT number {vat}.
              en: `Product House Trading Est., commercial registration ${SITE.cr}, VAT number ${SITE.vat}.`,
            },
          },
          {
            p: {
              ar: "نخدم المقاولين ومحطات الخرسانة وشركات التأجير والورش والميكانيكيين.", // We serve contractors, concrete plants, rental companies, workshops and mechanics.
              en: "We serve contractors, concrete plants, rental companies, workshops and mechanics.",
            },
          },
        ],
      },
    ],
    codes: ["201010-064", "201010-100", "201010-132"],
    cats: ["wear", "seals", "pipes", "filters"],
    faq: [
      {
        q: { ar: "كيف أعرف سعر القطعة؟", /* How do I find out the price of a part? */ en: "How do I get the price of a part?" },
        a: {
          ar: `الأسعار عند الطلب. أرسل رقم القطعة أو صورتها على واتساب ${wa}، ونرد عليك بالسعر والتوفر.`,
          en: `Prices are given on request. Send the part number or a photo on WhatsApp at ${wa} and we reply with the price and availability.`,
        },
      },
      {
        q: { ar: "هل توصّلون خارج الرياض؟", /* Do you deliver outside Riyadh? */ en: "Do you deliver outside Riyadh?" },
        a: {
          ar: "نعم، نوفّر التوصيل داخل الرياض وخارجها. اكتب لنا المدينة على واتساب لنؤكد لك الطريقة.",
          en: "Yes, we deliver inside and outside Riyadh. Tell us your city on WhatsApp and we confirm how.",
        },
      },
    ],
  },
];

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
