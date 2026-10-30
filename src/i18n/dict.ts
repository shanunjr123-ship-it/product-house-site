import type { Lang } from "@/config/site";

// English glosses sit next to every Arabic string. Arabic copy is a draft for the business to verify.
const ar = {
  brandLine: "قطع غيار مضخات الخرسانة والخلاطات", // Spare parts for concrete pumps and mixers
  navCatalog: "الكتالوج", // Catalog
  navMachines: "الآلات والعلامات", // Machines & brands
  tabMachines: "الآلات", // Machines
  toastAdded: "أُضيفت إلى طلب السعر", // Added to the price request
  toastView: "عرض", // View
  navAbout: "من نحن", // About us
  navContact: "تواصل معنا", // Contact us
  navQuote: "طلب السعر", // Price request
  menu: "القائمة", // Menu
  switchLang: "English",

  homeTitle: "مورّد قطع غيار مضخات الخرسانة والخلاطات ومحطات الخلط في الرياض", // Supplier of spare parts for concrete pumps, mixers and batching plants in Riyadh
  homeSub: "معدّتك متوقفة؟ أرسل رقم القطعة أو صورة القطعة القديمة، ويصلك السعر على واتساب.", // Equipment stopped? Send the part number or a photo of the old part, and the price reaches you on WhatsApp.
  brandsLbl: "قطع غيار للماركات التي تشغّلها", // Spare parts for the brands you run
  pumpHint: "اضغط على جزء المضخة الذي تحتاجه", // Tap the part of the pump you need
  pumpAlt: "رسم توضيحي لمضخة خرسانة محمولة على شاحنة، وكل نقطة تفتح قسمًا من قطع الغيار", // Illustration of a truck-mounted concrete pump; each point opens a spare-parts category
  browse: "تصفّح", // Browse
  searchPlaceholder: "رقم القطعة أو اسمها", // Part number or name
  searchBtn: "بحث", // Search
  shelfCaption: "رفوف المحل في الخالدية، الرياض", // Shop shelves, Al Khalidiyyah, Riyadh
  catsTitle: "ابحث عن القطعة التي تحتاجها", // Find the part you need
  itemsWord: "صنف", // item(s)
  machinesTitle: "ابدأ من آلتك", // Start with your machine
  visitTitle: "زورونا في المحل", // Visit us in the shop
  openMap: "افتح الموقع في خرائط جوجل", // Open the location in Google Maps
  howTitle: "كيف تطلب", // How to order
  step1: "ابحث أو أرسل صورة", // Search or send a photo
  step1d: "برقم القطعة أو اسمها، أو بصورة القطعة القديمة.", // By part number or name, or with a photo of the old part.
  step2: "أضف القطع إلى طلبك", // Add the parts to your request
  step2d: "اجمع كل ما تحتاجه واسأل مرة واحدة.", // Gather everything you need and ask once.
  step3: "استلم السعر على واتساب", // Get the price on WhatsApp
  step3d: "نرد عليك بالسعر والتوفر.", // We reply with the price and availability.
  howVis1: "كاميرا الهاتف تصوّر بطاقة القطعة", // Phone camera framing the label on a part
  howVis2: "قائمة طلب سعر فيها ثلاث قطع", // A price-request list with three parts ticked
  howVis3: "رسالة واتساب فيها عرض السعر", // A WhatsApp message with the price quote
  howSend: "أرسل عبر واتساب", // Send on WhatsApp
  howAsk: "كم سعر هذه القطع الثلاث؟", // What is the price of these three parts?
  howQuoteReady: "عرض السعر جاهز", // Your quote is ready
  howPriceOk: "تم تأكيد الأسعار", // Prices confirmed
  howReply: "ردّ بـ «تم» لتأكيد الطلب", // Reply "Done" to confirm the order
  dlTitle: "كل القطع في ملف واحد", // Every part in one file
  dlBody: "{n} قطعة برقم القطعة والرقم المرجعي (OEM)، بالعربي والإنجليزي. الأسعار عند الطلب على واتساب.", // {n} parts with part code and OEM reference number, in Arabic and English. Prices on request via WhatsApp.
  dlBtn: "تحميل كتالوج قطع الغيار الكامل (PDF)", // Download the complete spare-parts catalog (PDF)
  missingTitle: "لم تجد القطعة؟", // Can't find the part?
  missingBody: "أرسل لنا اسمها أو صورتها على واتساب ونبحث لك عنها.", // Send us its name or a photo on WhatsApp and we will look for it.

  catalogTitle: "كتالوج قطع الغيار", // Spare parts catalog
  allCats: "كل الأقسام", // All categories
  allTags: "كل الآلات والعلامات", // All machines and brands
  found: "عدد النتائج: {n}", // Results: {n}
  showMore: "عرض المزيد", // Show more
  noResults: "لا توجد نتائج. جرّب رقم القطعة فقط، أو اسأل عن القطعة على واتساب.", // No results. Try the part number only, or ask about the part on WhatsApp.
  partsFor: "قطع {name}", // {name} parts

  partNo: "رقم القطعة", // Part number
  category: "القسم", // Category
  machineBrand: "الآلة أو العلامة", // Machine or brand
  priceOnRequest: "السعر عند الطلب", // Price on request
  priceNote: "نرد عليك بالسعر والتوفر على واتساب.", // We reply with the price and availability on WhatsApp.
  askWhatsapp: "اطلب السعر على واتساب", // Request the price on WhatsApp
  addQuote: "أضف إلى طلب السعر", // Add to the price request
  inQuote: "في طلب السعر", // In the price request
  call: "اتصل بنا", // Call us
  similar: "قطع مشابهة", // Similar parts
  refNo: "الرقم المرجعي (OEM)", // Reference number (OEM)
  photoOnReq: "صورة القطعة عند الطلب", // Part photo on request
  photoOnReqBody: "نرسل لك صورة هذه القطعة بالتحديد على واتساب قبل أن تقرر.", // We send you a photo of this exact part on WhatsApp before you decide.
  askPartPhoto: "اطلب صورة القطعة", // Ask for the part photo
  aboutBrowse: "تصفّح قطع الغيار حسب القسم", // Browse spare parts by category
  sendPhoto: "أرسل لنا صورة القطعة التي لديك على واتساب لنتأكد من المطابقة.", // Send us a photo of the part you have on WhatsApp so we can check the match.
  home: "الرئيسية", // Home

  quoteTitle: "طلب السعر", // Price request
  quoteEmpty: "قائمتك فارغة. أضف القطع من الكتالوج.", // Your list is empty. Add parts from the catalog.
  quoteEmptyCta: "تصفّح الكتالوج", // Browse the catalog
  directions: "الاتجاهات إلى المحل", // Directions to the shop
  qty: "الكمية", // Quantity
  remove: "حذف", // Remove
  fName: "الاسم", // Name
  fCompany: "الشركة", // Company
  fCity: "المدينة", // City
  fNotes: "ملاحظات", // Notes
  sendQuote: "أرسل الطلب عبر واتساب", // Send the request via WhatsApp
  clearList: "تفريغ القائمة", // Clear the list

  aboutTitle: "من نحن", // About us
  aboutBody: "مؤسسة بيت المنتج للتجارة في الرياض توفّر قطع غيار مضخات الخرسانة والخلاطات ومحطات الخلط، مع المحامل والفلاتر والأختام والصمامات والقطع الكهربائية التي تُبقيها تعمل.", // Product House Trading Est. in Riyadh supplies spare parts for concrete pumps, mixers and batching plants, with the bearings, filters, seals, valves and electrical parts that keep them running.
  aboutWho: "نخدم المقاولين ومحطات الخرسانة وشركات التأجير والورش والميكانيكيين.", // We serve contractors, concrete plants, rental companies, workshops and mechanics.
  aboutAuth: "موزّع معتمد لشركة بوتزمايستر (Putzmeister).", // Authorised distributor of Putzmeister.
  aboutDelivery: "نوفّر التوصيل داخل الرياض وخارجها.", // We deliver inside and outside Riyadh.

  contactTitle: "تواصل معنا", // Contact us
  address: "العنوان", // Address
  hours: "ساعات العمل", // Opening hours
  phone: "الهاتف", // Phone
  whatsappLbl: "واتساب", // WhatsApp
  emailLbl: "البريد الإلكتروني", // Email
  instagramLbl: "إنستغرام", // Instagram
  igFollow: "تابعنا على إنستغرام", // Follow us on Instagram

  footerRights: "جميع الحقوق محفوظة.", // All rights reserved.
  vatLbl: "الرقم الضريبي", // VAT number
  crLbl: "السجل التجاري", // Commercial registration
  quickLinks: "روابط سريعة", // Quick links
  waFloat: "واتساب", // WhatsApp

  waGreetOne: "السلام عليكم، أرغب بطلب سعر وتوفر القطعة التالية:", // Peace be upon you, I would like the price and availability of this part:
  waGreetMany: "السلام عليكم، أرغب بطلب سعر وتوفر القطع التالية:", // Peace be upon you, I would like the price and availability of these parts:
  waGeneral: "السلام عليكم، أريد الاستفسار عن قطعة غيار.", // Peace be upon you, I would like to ask about a spare part.
  waPhoto: "السلام عليكم، سأرسل لكم صورة قطعة وأريد معرفة توفرها وسعرها.", // Peace be upon you, I will send you a photo of a part and want to know its availability and price.
  sendPhotoCta: "لا تعرف الرقم؟ أرسل صورة القطعة", // Don't know the number? Send a photo of the part
  trustParts: "{n} قطعة غيار في الكتالوج", // {n} spare parts in the catalog
  trustAuth: "موزّع معتمد لبوتزمايستر", // Authorised Putzmeister distributor
  trustDelivery: "توصيل داخل الرياض وخارجها", // Delivery inside and outside Riyadh
  addShort: "أضف", // Add
  inShort: "تمت الإضافة", // Added
  viewAll: "عرض الكل", // View all
  openMapShort: "الموقع على الخريطة", // Location on the map
  searchTry: "جرّب:", // Try:
  addMid: "أضف للطلب", // Add to request
  trustShop: "زورونا في محلنا بالخالدية، الرياض", // Visit us at our shop in Al Khalidiyyah, Riyadh
  sendPhotoShort: "أرسل صورة القطعة", // Send a photo of the part
  sendPhotoSub: "نتعرّف عليها ونرد بالسعر", // We identify it and reply with the price
  callSub: "اتصال مباشر", // Direct call
  askShort: "اسألنا على واتساب", // Ask us on WhatsApp
  qtyLbl: "الكمية", // Quantity
  footVisit: "زورونا", // Visit us
  footLinks: "روابط سريعة", // Quick links
  brandsWord: "علامة وآلة", // brands and machines
  notFoundTitle: "الصفحة غير موجودة", // Page not found
  statsTitle: "رفوفنا بالأرقام", // Our shelves, in numbers
  statsSub: "نعمل مع المقاولين ومحطات الخرسانة والورش.", // We work with contractors, concrete plants and workshops.
  brandsNote: "أسماء الماركات وشعاراتها ملك لأصحابها، وتُستخدم هنا لبيان الآلات التي تناسبها قطعنا فقط.", // Brand names and logos belong to their owners and are used here only to show which machines our parts fit.
  faqTitle: "أسئلة شائعة", // Frequently asked questions
  reviewsTitle: "آراء عملائنا", // What our customers say
  reviewsCount: "{n} تقييم على جوجل", // {n} reviews on Google
  reviewsCta: "قيّمنا على جوجل", // Rate us on Google
  reviewsSource: "تقييم على جوجل", // Google review
  reviewsInvite: "اشتريت منا؟ شاركنا رأيك على خرائط جوجل، فهو يساعد غيرك في الاختيار.", // Bought from us? Share your opinion on Google Maps; it helps others choose.
  statYears: "سنة خبرة في قطع غيار المعدات الثقيلة", // years of experience in heavy-equipment spare parts
  statParts: "قطعة غيار مسجّلة في الكتالوج", // spare parts listed in the catalog
  statCustomers: "عميل من المقاولين والورش", // customers from contractors and workshops
  statReply: "دقائق متوسط الرد على واتساب", // minutes average reply time on WhatsApp
} as const;

type Dict = { [K in keyof typeof ar]: string };

const en: Dict = {
  brandLine: "Spare parts for concrete pumps and mixers",
  navCatalog: "Catalog",
  navMachines: "Machines & brands",
  tabMachines: "Machines",
  toastAdded: "Added to price request",
  toastView: "View",
  navAbout: "About",
  navContact: "Contact",
  navQuote: "Price request",
  menu: "Menu",
  switchLang: "العربية",

  homeTitle: "Spare parts supplier for concrete pumps, mixers and batching plants in Riyadh",
  homeSub: "Machine down? Send the part number or a photo of the old part. We reply with the price on WhatsApp.",
  brandsLbl: "Parts for the brands you run",
  pumpHint: "Tap the pump part you need",
  pumpAlt: "Illustration of a truck-mounted concrete pump; each point opens a spare-parts category",
  browse: "Browse",
  searchPlaceholder: "Part number or name",
  searchBtn: "Search",
  shelfCaption: "Shop shelves, Al Khalidiyyah, Riyadh",
  catsTitle: "Find the part you need",
  itemsWord: "items",
  machinesTitle: "Start with your machine",
  visitTitle: "Visit the shop",
  openMap: "Open in Google Maps",
  howTitle: "How to order",
  step1: "Search or send a photo",
  step1d: "Part number, name, or a photo of the old part.",
  step2: "Add parts to your request",
  step2d: "List everything you need and ask once.",
  step3: "Get the price on WhatsApp",
  step3d: "We reply with price and availability.",
  howVis1: "Phone camera framing the label on a part",
  howVis2: "A price-request list with three parts ticked",
  howVis3: "A WhatsApp message with the price quote",
  howSend: "Send on WhatsApp",
  howAsk: "Price for these 3 parts?",
  howQuoteReady: "Your quote is ready",
  howPriceOk: "Prices confirmed",
  howReply: "Reply OK to confirm the order",
  dlTitle: "Every part in one file",
  dlBody: "{n} parts with part codes and OEM reference numbers, in English and Arabic. Prices on request via WhatsApp.",
  dlBtn: "Download Full Parts Catalog (PDF)",
  missingTitle: "Can't find the part?",
  missingBody: "Send us the name or a photo on WhatsApp and we will look for it.",

  catalogTitle: "Spare parts catalog",
  allCats: "All categories",
  allTags: "All machines and brands",
  found: "Results: {n}",
  showMore: "Show more",
  noResults: "No results. Try the part number only, or ask about the part on WhatsApp.",
  partsFor: "{name} parts",

  partNo: "Part number",
  category: "Category",
  machineBrand: "Machine or brand",
  priceOnRequest: "Price on request",
  priceNote: "We reply with price and availability on WhatsApp.",
  askWhatsapp: "Ask for the price on WhatsApp",
  addQuote: "Add to price request",
  inQuote: "In price request",
  call: "Call us",
  similar: "Similar parts",
  refNo: "Reference no. (OEM)",
  photoOnReq: "Part photo on request",
  photoOnReqBody: "We send you a photo of this exact part on WhatsApp before you decide.",
  askPartPhoto: "Ask for the part photo",
  aboutBrowse: "Browse spare parts by category",
  sendPhoto: "Send us a photo of the part you have on WhatsApp and we will check the match.",
  home: "Home",

  quoteTitle: "Price request",
  quoteEmpty: "Your list is empty. Add parts from the catalog.",
  quoteEmptyCta: "Browse the catalog",
  directions: "Get directions",
  qty: "Quantity",
  remove: "Remove",
  fName: "Name",
  fCompany: "Company",
  fCity: "City",
  fNotes: "Notes",
  sendQuote: "Send the request on WhatsApp",
  clearList: "Clear the list",

  aboutTitle: "About us",
  aboutBody: "Product House Trading Est. supplies spare parts for concrete pumps, mixers and batching plants from Riyadh, along with the bearings, filters, seals, valves and electrical parts that keep them running.",
  aboutWho: "We serve contractors, concrete plants, rental companies, workshops and mechanics.",
  aboutAuth: "Authorised Putzmeister distributor.",
  aboutDelivery: "We deliver inside and outside Riyadh.",

  contactTitle: "Contact us",
  address: "Address",
  hours: "Opening hours",
  phone: "Phone",
  whatsappLbl: "WhatsApp",
  emailLbl: "Email",
  instagramLbl: "Instagram",
  igFollow: "Follow us on Instagram",

  footerRights: "All rights reserved.",
  vatLbl: "VAT number",
  crLbl: "CR number",
  quickLinks: "Quick links",
  waFloat: "WhatsApp",

  waGreetOne: "Hello, I would like the price and availability of this part:",
  waGreetMany: "Hello, I would like the price and availability of these parts:",
  waGeneral: "Hello, I would like to ask about a spare part.",
  waPhoto: "Hello, I will send you a photo of a part. Please tell me if you have it and the price.",
  sendPhotoCta: "No part number? Send a photo",
  trustParts: "{n} spare parts in the catalog",
  trustAuth: "Authorised Putzmeister distributor",
  trustDelivery: "Delivery inside and outside Riyadh",
  addShort: "Add",
  inShort: "Added",
  viewAll: "View all",
  openMapShort: "Open in Maps",
  searchTry: "Try:",
  addMid: "Add to request",
  trustShop: "Visit our shop in Al Khalidiyyah, Riyadh",
  sendPhotoShort: "Send a part photo",
  sendPhotoSub: "We identify it and reply with the price",
  callSub: "Direct call",
  askShort: "Ask us on WhatsApp",
  qtyLbl: "Quantity",
  footVisit: "Visit us",
  footLinks: "Quick links",
  brandsWord: "brands and machines",
  notFoundTitle: "Page not found",
  statsTitle: "Our shelves, in numbers",
  statsSub: "We work with contractors, concrete plants and workshops.",
  brandsNote: "Brand names and logos belong to their owners and are used here only to show which machines our parts fit.",
  faqTitle: "Frequently asked questions",
  reviewsTitle: "What our customers say",
  reviewsCount: "{n} reviews on Google",
  reviewsCta: "Rate us on Google",
  reviewsSource: "Google review",
  reviewsInvite: "Bought from us? Share your experience on Google Maps; it helps the next buyer choose.",
  statYears: "years in heavy-equipment spare parts",
  statParts: "spare parts listed in the catalog",
  statCustomers: "contractor and workshop customers",
  statReply: "minutes average WhatsApp reply time",
};

export const DICT: Record<Lang, Dict> = { ar, en };
export type { Dict };
export const fmt = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
