import type { Guide, L } from "./guides";

// Blog articles, clusters "brands" (Putzmeister, Schwing) and "buying" (choosing a supplier).
// Same rules as guides-pumps.ts. Nothing here says the parts are genuine, gives a price, a warranty, a return
// policy or a VAT-invoice promise beyond what the owner confirmed (see FAQ in faq.ts).

const l = (ar: string, en: string): L => ({ ar, en });
const DATE = "2026-11-17";

export const BRAND_GUIDES: Guide[] = [
  /* ---------------------------------------------------- Putzmeister */
  {
    slug: "putzmeister-spare-parts-riyadh",
    date: DATE,
    cluster: "brands",
    title: l(
      "قطع غيار بوتزمايستر في الرياض: كيف تحدد موديل مضختك وتطلب القطعة الصحيحة",
      "Putzmeister Spare Parts in Riyadh: How to Identify Your Pump Model and Order the Right Part",
    ),
    desc: l(
      "كيف تطلب قطع غيار مضخات بوتزمايستر من الرياض: أين تجد الموديل، أي القطع تُطلب أكثر، ما معنى الرقم المرجعي بين القوسين، وماذا ترسل لنحدد القطعة.",
      "How to order Putzmeister pump spare parts from Riyadh: where to find the model, which parts are asked for most, what the reference number in brackets means, and what to send so we identify the part.",
    ),
    answer: l(
      "لطلب قطعة بوتزمايستر صحيحة أرسل موديل المضخة من لوحة البيانات، واسم القطعة أو رقمها المرجعي، وصورة القطعة القديمة. بوتزمايستر هي أكبر ماركة في كتالوجنا، وتشمل قطع التآكل والأختام والمضخات الهيدروليكية والصمامات وأعمدة الخلط وريشه.",
      "To order the right Putzmeister part, send the pump model from its data plate, the part name or reference number, and a photo of the old part. Putzmeister is the largest brand in our catalogue, with wear parts, seals, hydraulic pumps, valves, mixer shafts and paddles.",
    ),
    intro: l(
      "مضخات بوتزمايستر منتشرة في الرياض، ولها موديلات وسلاسل كثيرة. نحن موزّع معتمد لبوتزمايستر، وأغلب الأخطاء التي نراها في الطلب سببها موديل غير محدد، لا قطعة غير موجودة.",
      "Putzmeister pumps are widespread in Riyadh and come in many models and series. We are an authorised Putzmeister distributor, and most ordering mistakes we see come from an unidentified model, not from a missing part.",
    ),
    sections: [
      {
        h: l("حدّد موديل المضخة", "Identify the pump model"),
        body: [
          {
            ul: [
              l("ابحث عن لوحة البيانات المعدنية على الآلة. فيها الموديل والرقم التسلسلي وسنة الصنع، وصوّرها كاملة.", "Find the metal data plate on the machine. It gives the model, serial number and year, and you should photograph all of it."),
              l("في أسماء قطعنا علامات للسلسلة أو النوع مثل Q60 أو Q80 أو Q90 أو Duro 22 أو Ergonic. طابقها بما هو مكتوب على آلتك أو قطعتك، وإذا لم تكن متأكدًا فأرسل الصورة.", "Our part names carry series or type marks such as Q60, Q80, Q90, Duro 22 or Ergonic. Match them against what is written on your machine or part, and if you are unsure, send the photo."),
              l("التفاصيل العامة في [كيف تعرف رقم قطعة الغيار](/guides/find-part-number/).", "General details are in [how to find the part number](/guides/find-part-number/)."),
            ],
          },
        ],
      },
      {
        h: l("القطع التي تُطلب أكثر", "The parts asked for most"),
        body: [
          {
            table: {
              head: [l("القسم", "Category"), l("أمثلة من الكتالوج", "Examples in the catalogue")],
              rows: [
                [l("[قطع التآكل](/category/wear/)", "[Wear parts](/category/wear/)"), l("لوحة النظارة (Spectacle Plate)، حلقة التآكل، حلقة الدفع، كأس الكرة (Ball Cup).", "Spectacle plate, wear ring, thrust ring and ball cup.")],
                [l("[الأختام](/category/seals/)", "[Seals](/category/seals/)"), l("أطقم أختام البيت الخارجي والمحرك الهيدروليكي وأسطوانة الغطاس.", "Seal kits for the outer housing, the hydraulic motor and the plunger cylinder.")],
                [l("[المضخات والمحركات](/category/pumps/)", "[Pumps and motors](/category/pumps/)"), l("مضخات هيدروليكية مثل A10VO28 ومحركات هيدروليكية.", "Hydraulic pumps such as A10VO28 and hydraulic motors.")],
                [l("[الصمامات](/category/valves/)", "[Valves](/category/valves/)"), l("صمامات اتجاهية بحجم 4/2 و4/3 وملفات سولينويد 24 فولت.", "4/2 and 4/3 directional valves and 24 V solenoid coils.")],
                [l("[الخلاط](/category/mixer/)", "[Mixer parts](/category/mixer/)"), l("أعمدة الخلط وريش المقلّب.", "Mixer shafts and agitator paddles.")],
                [l("[الكهرباء](/category/electrical/)", "[Electrical](/category/electrical/)"), l("ليمت سويتش وحساس حرارة وحساس ضغط وبطاريات.", "Limit switches, temperature and pressure sensors and batteries.")],
              ],
            },
          },
        ],
      },
      {
        h: l("الرقم المرجعي بين القوسين", "The reference number in brackets"),
        body: [
          {
            p: l(
              "في بعض أسماء الكتالوج رقم بين قوسين، مثل «Seal Kit Outer Housing (240390004)». هذا الرقم المرجعي للشركة المصنّعة حين نملكه. إذا كان عندك رقم مرجعي من كتالوج آلتك فاذكره عند الطلب، فهو أدق من الاسم. جميع القطع التي نبيعها أصلية. وللفرق بين الأصلي والبديل راجع [الأصلي والبديل](/guides/original-vs-alternative-parts/).",
              "Some catalogue names carry a number in brackets, such as “Seal Kit Outer Housing (240390004)”. That is the maker's reference number where we have it. If you have a reference number from your machine's parts book, quote it when you order, because it is more exact than the name. All the parts we sell are original. For the difference between original and alternative, see [original vs alternative](/guides/original-vs-alternative-parts/).",
            ),
          },
        ],
      },
      {
        h: l("كيف تطلب", "How to order"),
        body: [
          {
            p: l(
              "تصفّح [كل قطع بوتزمايستر](/machines/putzmeister/) أو أرسل رقم القطعة أو صورتها على واتساب ونرد بالسعر والتوفر، كما في [كيف تطلب](/guides/how-to-order/). ولقطع التآكل بالتحديد راجع [لوحة النظارة وحلقة القطع](/guides/spectacle-plate-cutting-ring/).",
              "Browse [all Putzmeister parts](/machines/putzmeister/) or send the part number or a photo on WhatsApp and we reply with price and availability, as in [how to order](/guides/how-to-order/). For wear parts in particular see [spectacle plate and cutting ring](/guides/spectacle-plate-cutting-ring/).",
            ),
          },
        ],
      },
    ],
    codes: ["201010-002", "201010-003", "201010-171", "201010-028", "201010-081", "201010-077"],
    cats: ["wear", "seals", "pumps", "valves", "mixer", "electrical"],
    faq: [
      { q: l("هل أنتم موزّع معتمد لبوتزمايستر؟", "Are you an authorised Putzmeister distributor?"), a: l("نعم، مؤسسة بيت المنتج للتجارة موزّع معتمد لبوتزمايستر في الرياض.", "Yes, Product House Trading Est. is an authorised Putzmeister distributor in Riyadh.") },
      { q: l("أين أجد موديل مضخة بوتزمايستر؟", "Where do I find the model of a Putzmeister pump?"), a: l("على لوحة بيانات معدنية مثبتة في الآلة. إذا لم تجدها فأرسل صورة المضخة والقطعة القديمة وسنساعدك على تحديد الموديل.", "On a metal data plate fixed to the machine. If you cannot find it, send a photo of the pump and the old part and we help you identify the model.") },
      { q: l("هل تتوفر لديكم ماركات أخرى غير بوتزمايستر؟", "Do you carry brands other than Putzmeister?"), a: l("نعم، الكتالوج يضم أيضًا قطعًا لشوينغ وسيفا وسَني وزينيث وزوملاين وغيرها. راجع [صفحة الماركات](/machines/).", "Yes, the catalogue also lists parts for Schwing, CIFA, Sany, Zenith, Zoomlion and others. See the [brands page](/machines/).") },
      { q: l("هل الرقم بين القوسين مهم؟", "Does the number in brackets matter?"), a: l("نعم، هو الرقم المرجعي للشركة المصنّعة حين نملكه. ذكره عند الطلب يقلّل احتمال الخطأ.", "Yes, it is the maker's reference number where we have it. Quoting it when you order reduces the chance of a mistake.") },
      { q: l("هل الأسعار على الموقع؟", "Are the prices on the site?"), a: l("لا. نرد بالسعر والتوفر عند إرسال رقم القطعة أو صورتها على واتساب.", "No. We reply with price and availability when you send the part number or photo on WhatsApp.") },
    ],
  },

  /* --------------------------------------------------------- Schwing */
  {
    slug: "schwing-spare-parts-riyadh",
    date: DATE,
    cluster: "brands",
    title: l(
      "قطع غيار شوينغ في الرياض: كيف تحدد القطعة وتطلبها من أول مرة",
      "Schwing Spare Parts in Riyadh: How to Identify the Part and Order It First Time",
    ),
    desc: l(
      "كيف تطلب قطع غيار مضخات شوينغ من الرياض: المقاسات في أسماء القطع (DN وغيرها)، أي القطع تُطلب أكثر، وماذا ترسل لنحدد القطعة.",
      "How to order Schwing pump spare parts from Riyadh: the sizes in part names (DN and others), which parts are asked for most, and what to send so we identify the part.",
    ),
    answer: l(
      "لطلب قطعة شوينغ صحيحة أرسل موديل المضخة، واسم القطعة مع المقاس المكتوب في اسمها (مثل 210 أو 230)، وصورة القطعة القديمة. الكتالوج يضم قطع تآكل وأسطوانات ضخ وأسطوانات ومحامل مقلّب ومراوح وبطاريات لشوينغ.",
      "To order the right Schwing part, send the pump model, the part name with the size in its name (such as 210 or 230), and a photo of the old part. The catalogue lists Schwing wear parts, delivery cylinders, agitator bearings, fans and batteries.",
    ),
    intro: l(
      "قطع شوينغ كثيرة المقاسات، والمقاس هو أهم معلومة في الطلب. هذا الدليل يوضح كيف تقرأ الأسماء وماذا ترسل.",
      "Schwing parts come in many sizes, and the size is the most important piece of information in an order. This guide shows how to read the names and what to send.",
    ),
    sections: [
      {
        h: l("اقرأ المقاس في اسم القطعة", "Read the size in the part name"),
        body: [
          {
            ul: [
              l("أسماء مثل «Cutting Ring 210» و«Wearing Insert 230» و«Pressure Spring DN 230» تحمل المقاس في الاسم. طابقه مع مضختك.", "Names such as “Cutting Ring 210”, “Wearing Insert 230” and “Pressure Spring DN 230” carry the size in the name. Match it to your pump."),
              l("أسطوانة الضخ تُكتب بقطرها وطولها مثل «Delivery Cylinder 230X2100».", "A delivery cylinder is written with its diameter and length, such as “Delivery Cylinder 230X2100”."),
              l("بعض الأسماء فيها رقم بين قوسين، مثل (10072694)، وهو الرقم المرجعي للشركة حين نملكه. اذكره عند الطلب.", "Some names carry a number in brackets, such as (10072694), the maker's reference number where we have it. Quote it when you order."),
              l("التفاصيل العامة في [كيف تعرف رقم قطعة الغيار](/guides/find-part-number/).", "General details are in [how to find the part number](/guides/find-part-number/)."),
            ],
          },
        ],
      },
      {
        h: l("القطع التي تُطلب أكثر", "The parts asked for most"),
        body: [
          {
            table: {
              head: [l("القسم", "Category"), l("أمثلة من الكتالوج", "Examples in the catalogue")],
              rows: [
                [l("[قطع التآكل](/category/wear/)", "[Wear parts](/category/wear/)"), l("حلقة القطع، وإدخال التآكل (Wearing Insert)، وبطانة البيت.", "Cutting ring, wearing insert and housing lining.")],
                [l("[المكابس والأسطوانات](/category/pistons/)", "[Pistons and cylinders](/category/pistons/)"), l("أسطوانة الضخ، ومكبس الرام، والمكبس المطاطي، وعين القضيب.", "Delivery cylinder, ram piston, rubber piston and rod eye.")],
                [l("[المحامل](/category/bearings/)", "[Bearings](/category/bearings/)"), l("محامل المقلّب المفتوحة والمغلقة والبوشات.", "Open and closed agitator bearings and bushings.")],
                [l("[التبريد والمراوح](/category/cooling/)", "[Cooling and fans](/category/cooling/)"), l("مراوح 24 فولت للمبرّد.", "24 V fans for the cooler.")],
                [l("[المضخات والمحركات](/category/pumps/)", "[Pumps and motors](/category/pumps/)"), l("مضخات A10VO28 وA2FO23 ومحركات هيدروليكية.", "A10VO28 and A2FO23 pumps and hydraulic motors.")],
                [l("[الكهرباء](/category/electrical/)", "[Electrical](/category/electrical/)"), l("بطاريات وملحقات كهربائية.", "Batteries and electrical accessories.")],
              ],
            },
          },
        ],
      },
      {
        h: l("قبل أن تطلب", "Before you order"),
        body: [
          {
            ul: [
              l("إذا كانت المضخة قديمة فصوّر القطعة واللوحة معًا، فبعض القطع تغيّرت بين السنوات.", "If the pump is old, photograph the part and the data plate together, because some parts changed between years."),
              l("جميع القطع التي نبيعها أصلية. وللفرق بين الأصلي والبديل راجع [الأصلي والبديل](/guides/original-vs-alternative-parts/).", "All the parts we sell are original. For the difference between original and alternative, see [original vs alternative](/guides/original-vs-alternative-parts/)."),
              l("لقطع التآكل راجع [لوحة النظارة وحلقة القطع](/guides/spectacle-plate-cutting-ring/).", "For wear parts see [spectacle plate and cutting ring](/guides/spectacle-plate-cutting-ring/)."),
            ],
          },
          {
            p: l(
              "تصفّح [كل قطع شوينغ](/machines/schwing/) أو أرسل الرقم أو الصورة على واتساب ونرد بالسعر والتوفر، كما في [كيف تطلب](/guides/how-to-order/).",
              "Browse [all Schwing parts](/machines/schwing/) or send the number or photo on WhatsApp and we reply with price and availability, as in [how to order](/guides/how-to-order/).",
            ),
          },
        ],
      },
    ],
    codes: ["201010-007", "201010-008", "201010-224", "201010-237", "201010-012", "201010-272"],
    cats: ["wear", "pistons", "bearings", "cooling", "pumps", "electrical"],
    faq: [
      { q: l("كيف أقرأ المقاس في اسم قطعة شوينغ؟", "How do I read the size in a Schwing part name?"), a: l("الرقم في الاسم، مثل 210 أو 230، هو مقاس القطعة. قارنه بمقاس قطعتك القديمة وأرسل لنا الصورة لنؤكد.", "The number in the name, such as 210 or 230, is the size of the part. Compare it to your old part and send us the photo so we confirm.") },
      { q: l("هل توفّرون كل قطع شوينغ؟", "Do you supply every Schwing part?"), a: l("لا نعد بذلك. الكتالوج يعرض ما لدينا، وإذا لم تجد قطعتك فأرسل صورتها ونرد بما هو متوفر.", "We do not promise that. The catalogue shows what we have, and if you do not find your part, send a photo and we reply with what is available.") },
      { q: l("ما الرقم بين القوسين مثل (10072694)؟", "What is the number in brackets such as (10072694)?"), a: l("هو الرقم المرجعي للشركة المصنّعة حين نملكه. ذكره عند الطلب يقلّل احتمال الخطأ.", "It is the maker's reference number where we have it. Quoting it when you order reduces the chance of a mistake.") },
      { q: l("هل المراوح والبطاريات متوفرة لشوينغ؟", "Are fans and batteries available for Schwing?"), a: l("الكتالوج يضم مراوح 24 فولت وبطاريات لشوينغ. أرسل الرقم أو الصورة لنؤكد التوفر.", "The catalogue lists 24 V fans and batteries for Schwing. Send the number or a photo and we confirm availability.") },
    ],
  },

  /* ------------------------------------------------------- supplier */
  {
    slug: "choose-spare-parts-supplier-riyadh",
    date: DATE,
    cluster: "buying",
    title: l(
      "كيف تختار مورّد قطع غيار مضخات الخرسانة في الرياض: ثمانية أسئلة قبل أن تدفع",
      "How to Choose a Concrete Pump Spare Parts Supplier in Riyadh: Eight Questions to Ask Before You Pay",
    ),
    desc: l(
      "ثمانية أسئلة تسألها لأي مورّد قطع غيار مضخات خرسانة وخلاطات في الرياض قبل الدفع: موديل الآلة، أصلي أم بديل، التوفر، الفاتورة، والتوصيل.",
      "Eight questions to ask any concrete pump and mixer spare parts supplier in Riyadh before you pay: machine model, original or alternative, availability, invoice and delivery.",
    ),
    answer: l(
      "اختر مورّدًا يسألك عن موديل الآلة ورقم القطعة أو صورتها قبل أن يعطيك سعرًا، ويقول لك صراحةً هل القطعة أصلية أم بديلة، ويحدد التوفر والتوصيل قبل الدفع، وله عنوان ومحل تستطيع زيارته وسجل تجاري ورقم ضريبي ظاهران. الحذر ممّن يسعّر قطعة دون أن يعرف آلتك.",
      "Choose a supplier who asks for the machine model and the part number or a photo before giving a price, says plainly whether the part is original or alternative, states availability and delivery before you pay, and has an address you can visit and a visible commercial registration and VAT number. Be careful with anyone who prices a part without knowing your machine.",
    ),
    intro: l(
      "القطعة الخطأ أو المتأخرة تكلّفك يوم توقف في الموقع. هذه الأسئلة تُظهر في دقائق إن كان المورّد يعرف ما يبيعه.",
      "The wrong or late part costs you a day of downtime on site. These questions show in minutes whether the supplier knows what it sells.",
    ),
    sections: [
      {
        h: l("ثمانية أسئلة قبل أن تدفع", "Eight questions before you pay"),
        body: [
          {
            ol: [
              l("هل يسألني عن ماركة الآلة وموديلها ورقم القطعة أو صورتها قبل أن يعطيني السعر؟ من يسعّر بلا أسئلة يخمّن.", "Does the supplier ask for the machine make, model and the part number or a photo before quoting? One who quotes without questions is guessing."),
              l("هل يقول لي صراحةً إن القطعة أصلية أم بديلة؟ راجع [الأصلي والبديل](/guides/original-vs-alternative-parts/).", "Does the supplier say plainly whether the part is original or alternative? See [original vs alternative](/guides/original-vs-alternative-parts/)."),
              l("هل القطعة متوفرة الآن أم تُطلب؟ وما موعد وصولها؟ اطلب تاريخًا لا عبارة «قريبًا».", "Is the part in stock now or ordered? When will it arrive? Ask for a date, not “soon”."),
              l("هل أستطيع رؤية اسم القطعة ورقمها وصورتها قبل الدفع؟ كتالوج على الإنترنت برقم لكل قطعة علامة جيدة.", "Can I see the part name, number and photo before paying? An online catalogue with a number for every part is a good sign."),
              l("هل أعرف مكان المورّد؟ المحل الذي له عنوان تستطيع زيارته أسهل في المتابعة إذا حدثت مشكلة.", "Do I know where the supplier is? A shop with an address you can visit is easier to follow up if a problem comes up."),
              l("هل السجل التجاري والرقم الضريبي ظاهران؟ هذا من أبسط علامات الجدية.", "Are the commercial registration and VAT number visible? This is one of the simplest signs of a serious business."),
              l("ما سياسة الإرجاع أو الاستبدال إذا لم تناسب القطعة؟ اسأل واطلب الإجابة مكتوبة.", "What is the return or exchange policy if the part does not fit? Ask, and ask for the answer in writing."),
              l("هل يوصّل إلى مدينتي، وكيف؟ اسأل عن الطريقة والموعد قبل الدفع.", "Do they deliver to my city, and how? Ask about the method and date before paying."),
            ],
          },
        ],
      },
      {
        h: l("علامات تستحق الحذر", "Warning signs"),
        body: [
          {
            ul: [
              l("سعر فوري دون أي سؤال عن الآلة.", "An instant price with no question about the machine."),
              l("رفض إخبارك إن كانت القطعة أصلية أو بديلة.", "A refusal to tell you whether the part is original or alternative."),
              l("لا عنوان ولا رقم تجاري ولا كتالوج، فقط رقم هاتف.", "No address, registration number or catalogue, only a phone number."),
              l("ضغط للدفع قبل تحديد التوفر والتوصيل.", "Pressure to pay before availability and delivery are settled."),
            ],
          },
        ],
      },
      {
        h: l("ماذا نعرض نحن للإجابة عن هذه الأسئلة", "What we show so you can check these"),
        body: [
          {
            ul: [
              l("كتالوج على الموقع برقم لكل قطعة، وفي كثير منها صورة ووصف: [تصفّح الكتالوج](/catalog/).", "An online catalogue with a number for each part, and for many a photo and description: [browse the catalogue](/catalog/)."),
              l("لا نعرض الأسعار على الموقع. نرد بالسعر والتوفر حين تُرسل رقم القطعة أو صورتها على واتساب، كما في [كيف تطلب](/guides/how-to-order/).", "We do not show prices on the site. We reply with price and availability when you send the part number or photo on WhatsApp, as in [how to order](/guides/how-to-order/)."),
              l("محلنا في الصناعية القديمة بالعويدة في الرياض، من 8 صباحًا إلى 7 مساءً والجمعة إجازة، والموقع على الخريطة في [صفحة التواصل](/contact/).", "Our shop is in the Old Industrial Area, Al Owaidah, Riyadh, 8 AM to 7 PM, closed Friday, with the map on the [contact page](/contact/)."),
              l("السجل التجاري والرقم الضريبي مطبوعان أسفل كل صفحة من الموقع.", "Our commercial registration and VAT numbers are printed at the bottom of every page of the site."),
              l("جميع القطع التي نبيعها أصلية.", "All the parts we sell are original."),
              l("نصدر فاتورة ضريبية، ونقبل جميع طرق الدفع، ولا يوجد حد أدنى للطلب.", "We issue VAT invoices, accept all payment methods and have no minimum order."),
              l("يمكن إرجاع القطعة أو استبدالها إذا لم تناسب آلتك.", "A part can be returned or exchanged if it does not fit your machine."),
              l("أغلب القطع عليها ضمان، ومدته وشروطه تختلف حسب القطعة.", "Most parts carry a warranty, and its length and terms depend on the part."),
              l("نوفّر التوصيل داخل الرياض وخارجها، ولا نشحن إلى دول الخليج الأخرى.", "We deliver inside and outside Riyadh, and we do not ship to other GCC countries."),
              l("نوفّر أيضًا قطعًا غير موجودة في الكتالوج.", "We also source parts that are not in the catalogue."),
            ],
          },
          {
            note: l(
              "تكلفة التوصيل ومدته ومدة توفير القطع من خارج الكتالوج تختلف حسب القطعة، لذلك اسألنا عن قطعتك عند الطلب.",
              "Delivery cost and time, and the time to source parts outside the catalogue, depend on the part, so ask us about your part when you order.",
            ),
          },
        ],
      },
    ],
    codes: ["201010-007", "201010-031", "201010-171"],
    cats: ["wear", "filters", "pumps"],
    faq: [
      { q: l("هل أشتري البديل الأرخص؟", "Should I buy the cheaper alternative?"), a: l("يعتمد على القطعة وطبيعة العمل. اسأل المورّد عن نوع القطعة صراحةً، واقرأ [الأصلي والبديل](/guides/original-vs-alternative-parts/) لتعرف ما تتأكد منه.", "It depends on the part and the job. Ask the supplier plainly which type it is, and read [original vs alternative](/guides/original-vs-alternative-parts/) to know what to check.") },
      { q: l("هل أحصل على سعر من صورة القطعة؟", "Can I get a price from a photo of the part?"), a: l("نعم. أرسل صورة القطعة أو رقمها على واتساب مع ماركة الآلة وموديلها، فنرد بالسعر والتوفر.", "Yes. Send a photo of the part or its number on WhatsApp with the machine make and model, and we reply with price and availability.") },
      { q: l("هل توصّلون خارج الرياض؟", "Do you deliver outside Riyadh?"), a: l("نعم، نوفّر التوصيل داخل الرياض وخارجها. اكتب لنا المدينة على واتساب لنؤكد لك الطريقة.", "Yes, we deliver inside and outside Riyadh. Tell us your city on WhatsApp and we confirm how.") },
      { q: l("ما أهم سؤال قبل الشراء؟", "What is the most important question before buying?"), a: l("هل القطعة مطابقة لموديل آلتي؟ لا تدفع قبل أن يؤكد المورّد المطابقة برقم القطعة أو الصورة.", "Does the part match my machine's model? Do not pay until the supplier confirms the match by part number or photo.") },
    ],
  },
];
