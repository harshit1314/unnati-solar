// src/content/business.js
// ============================================================
//  SolarHub — Single source of truth for all business data
//  Edit this file to update copy without touching components
// ============================================================

export const BUSINESS = {
  name: 'SolarHub',
  tagline: 'Save Money Save Future',
  heroTagline: 'Aap bas bill bhejo, baaki sab humara kaam.',
  heroSubtitle: 'You just send your electricity bill — we handle the survey, PM Surya Ghar subsidy, DVVNL net metering, and installation.',
  parentEntity: 'Seema Electronics',
  upnedaCode: 'AGC2512234235',
  discom: 'All India DISCOMs Supported (DVVNL, PVVNL, PUVVNL, MVVNL, etc.)',

  address: {
    line1: '18/162, H-3, Fatehabad Road',
    line2: 'Taj Ganj, Agra — 282001',
    state: 'Uttar Pradesh',
    pincode: '282001',
    googleMapsUrl: 'https://maps.google.com/?q=18/162+H-3+Fatehabad+Road+Taj+Ganj+Agra+282001',
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.8!2d78.0081!3d27.1641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDA5JzUwLjgiTiA3OMKwMDAnMjkuMiJF!5e0!3m2!1sen!2sin!4v1',
  },

  contacts: {
    primary: { name: 'Divyansh Garg', phone: '+91 80777 80429', role: 'Director' },
    secondary: { name: 'Harshit Agarwal', phone: '+91 83848 35981', role: 'Technical Head' },
    email: 'solarhub050815@gmail.com',
    whatsapp: '918384835981', // without + for wa.me URL
    teamSize: '20+',
  },

  serviceArea: {
    description: 'Agra + 50 km radius',
    cities: ['Agra', 'Mathura', 'Vrindavan', 'Firozabad', 'Fatehpur Sikri', 'Tundla', 'Achhnera', 'Bah', 'Kheragarh', 'Kiraoli'],
  },
  brands: ['Adani Solar', 'Waaree Solar', 'Tata Solar', 'Havells', 'Luminous'],
  categories: ['On-grid Solar', 'Off-grid Solar', 'Hybrid Solar'],
  emiStartsFrom: 1499,
};

// ---- Business Rules ----
export const SOLAR_RULES = {
  // Generation
  avgKwhPerKwPerDay: 4.5,   // Agra average
  avgUnitsPerKwPerMonth: 135,

  // Tariffs (DVVNL avg slabs)
  residentialTariffPerUnit: 7.5,  // ₹6.50–₹8.00 avg
  commercialTariffPerUnit: 9.25,  // ₹8.50–₹10.00 avg

  // Install cost per kW
  residentialCostPerKw: 60000,   // ₹55k–₹65k range
  commercialCostPerKw: 52500,    // ₹50k–₹55k range

  // EMI assumptions
  emiRatePercent: 6,   // % per annum (Max 6% as requested)
  emiTermMonths: 60,    // 5 years

  // Commercial accelerated depreciation
  commercialDepreciationRate: 0.40,  // 40% in Year 1
  
  // PM Surya Ghar central subsidy slabs (2024 scheme)
  getSubsidy: (systemKw) => {
    if (systemKw <= 1) return 30000;
    if (systemKw <= 2) return 30000 + Math.min(systemKw - 1, 1) * 30000;
    return 78000; // capped at 3kW+
  },
  
  // UP state top-up (indicative — confirm from UPNEDA)
  getUpStateSubsidy: (systemKw) => Math.min(Math.round(systemKw * 15000), 30000),
};

// ---- EMI Calculator ----
export const calcEmi = (principal, annualRate, months) => {
  const r = annualRate / 100 / 12;
  if (r === 0) return Math.round(principal / months);
  return Math.round((principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1));
};

// ---- Pincode Coverage ----
// Agra + 50 km radius — covers Agra, Mathura, Firozabad, Vrindavan, Tundla, Achhnera, Bah, Kheragarh
export const SERVICE_PINCODES = new Set([
  // Agra city
  '282001','282002','282003','282004','282005','282006','282007','282008','282009','282010',
  '282002','282003','282004','282005','282006','282007','282008','282009','282010',
  // Agra district outskirts
  '282101','282102','282103','282104','282105','282106','282107','282108','282109','282110',
  '282121','282122','282123','282124','282125','282126','282127','282128','282129','282130',
  // Fatehpur Sikri
  '283110','283111','283112','283113',
  // Kheragarh, Achhnera, Bah, Kiraoli
  '283104','283105','283106','283107','283108','283109','283114','283115','283116',
  // Tundla
  '283204','283205','283206',
  // Firozabad
  '283201','283202','283203','283207','283208','283209','283210',
  '283203','283204','283205','283206',
  // Mathura
  '281001','281002','281003','281004','281005','281006',
  '281121','281122','281123','281124','281125','281126',
  // Vrindavan, Govardhan
  '281121','281122','281136','281137',
  // Hathras (partial)
  '204101','204102','204103',
  // Etah (partial, ~50km)
  '207001','207002','207003',
]);

export const isPincodeServed = (pincode) => SERVICE_PINCODES.has(String(pincode).trim());

// ---- Trust Pillars ----
export const TRUST_PILLARS = [
  {
    icon: '🏛️',
    title: 'UPNEDA Empanelled',
    subtitle: `Vendor Code: ${BUSINESS.upnedaCode}`,
    description: 'Officially approved by UP New & Renewable Energy Development Agency — your installation is government-recognized.',
  },
  {
    icon: '☀️',
    title: 'PM Surya Ghar Subsidy',
    subtitle: 'Up to ₹1,08,000 (Central + State)',
    description: 'We handle the entire application process for both Central (₹78k) and UP State (₹30k) subsidies — you don\'t fill a single form.',
  },
  {
    icon: '💳',
    title: 'EMI Finance Available',
    subtitle: 'From ~₹2,200/month',
    description: 'Go solar with zero upfront stress. EMI arranged by us through partner banks — quick approval.',
  },
  {
    icon: '⚡',
    title: 'All-India DISCOM Support',
    subtitle: 'Net Metering for DVVNL, PVVNL, PUVVNL & more',
    description: 'We handle all paperwork for net metering with your local electricity provider — your meter runs backward on sunny days.',
  },
  {
    icon: '🛡️',
    title: '25-Year Panel Warranty',
    subtitle: 'Installation + Performance Guarantee',
    description: 'Tier-1 panels with manufacturer warranty. We guarantee workmanship for every installation.',
  },
  {
    icon: '🗺️',
    title: 'Free Site Visit',
    subtitle: 'Agra + 50 km radius',
    description: 'Our engineer visits your site, measures your roof, checks shadowing — completely free, no obligation.',
  },
];

// ---- How It Works Steps ----
export const HOW_IT_WORKS = [
  {
    step: '01',
    icon: '📄',
    title: 'Bill Bhejiye',
    titleEn: 'Send Your Bill',
    description: 'WhatsApp ya form ke through apna bijli ka bill bhejiye. Bas yahi karna hai.',
  },
  {
    step: '02',
    icon: '📞',
    title: 'Free Quote',
    titleEn: 'Get Free Quote',
    description: '24 ghante mein hum aapko accurate quote denge — system size, cost, subsidy, EMI — sab ke saath.',
  },
  {
    step: '03',
    icon: '🏠',
    title: 'Site Visit',
    titleEn: 'Free Site Survey',
    description: 'Hamara engineer aayega, roof dekha, shadowing check karega — bilkul free, koi commitment nahi.',
  },
  {
    step: '04',
    icon: '⚡',
    title: 'Installation + 25-Year Warranty',
    titleEn: 'Install & Warranty',
    description: 'Professional installation, DVVNL net metering, PM Surya Ghar subsidy filing — hum sab handle karte hain.',
  },
];

// ---- Testimonials ----
export const TESTIMONIALS = [
  {
    name: 'Ramesh Sharma ji',
    locality: 'Dayalbagh, Agra',
    rating: 5,
    text: 'Hamara monthly bill ₹8,200 tha. SolarHub ne 5kW system lagaya, ab bill ₹800 ata hai. Subsidy bhi unhone hi fill kari. Bahut acha service.',
    systemSize: '5 kW',
    savings: '₹7,400/month',
    propertyType: 'residential',
  },
  {
    name: 'Sunita Agarwal',
    locality: 'Civil Lines, Agra',
    rating: 5,
    text: 'Main pehle bahut confused thi solar ke baare mein. SolarHub team ne sab explain kiya, EMI arrange kiya, aur system lagane ke baad DVVNL ka kaam bhi unhi ne kiya. Highly recommended.',
    systemSize: '3 kW',
    savings: '₹4,200/month',
    propertyType: 'residential',
  },
  {
    name: 'Mohammad Farhan',
    locality: 'Sadar Bazar, Agra',
    rating: 5,
    text: 'Meri dukan ka bill bohot zyada tha. 8kW commercial system lagaya. Pehle hi saal 40% depreciation benefit mila. Bahut hi professional team hai.',
    systemSize: '8 kW',
    savings: '₹12,000/month',
    propertyType: 'commercial',
  },
  {
    name: 'Pradeep Gupta',
    locality: 'Sikandra, Agra',
    rating: 5,
    text: 'UPNEDA empanelled vendor se hi lagwana chahta tha. SolarHub ka code verify kiya — genuine nikla. Installation quality bahut badhia hai.',
    systemSize: '4 kW',
    savings: '₹5,800/month',
    propertyType: 'residential',
  },
  {
    name: 'Asha Devi',
    locality: 'Vrindavan, Mathura',
    rating: 5,
    text: 'Vrindavan mein bhi service milti hai — yeh mujhe nahi pata tha. Team time par aayi, kaam 2 din mein ho gaya. Ab bijli ki chinta nahi.',
    systemSize: '2 kW',
    savings: '₹2,800/month',
    propertyType: 'residential',
  },
  {
    name: 'Suresh Bansal',
    locality: 'Firozabad',
    rating: 5,
    text: 'Factory ke liye bohot badhia ROI mila. 2 saal mein payback. SolarHub ne depreciation calculation bhi diya jo CA ko diya. Professional service.',
    systemSize: '25 kW',
    savings: '₹38,000/month',
    propertyType: 'factory',
  },
];

// ---- FAQ ----
export const FAQ = [
  {
    q: 'PM Surya Ghar subsidy ke liye kaun eligible hai?',
    a: 'Koi bhi residential bijli connection wala citizen eligible hai. Agra, Mathura aur poore UP mein kisi bhi DISCOM (DVVNL, PVVNL, etc.) ka connection hona chahiye. SolarHub poora process handle karta hai.',
  },
  {
    q: 'Subsidy kitni milti hai?',
    a: 'Total ₹1,08,000 tak ki subsidy milti hai. Central subsidy: up to ₹78,000 (3kW+ system). UP State subsidy: up to ₹30,000. Commercial systems ke liye 40% accelerated depreciation available hai.',
  },
  {
    q: 'Kitne time mein installation hoti hai?',
    a: 'Site visit se le kar poori installation tak typically 2-4 weeks lagti hai. DVVNL net metering approval mein thoda aur waqt lag sakta hai, lekin hum sab coordinate karte hain.',
  },
  {
    q: 'EMI option available hai kya?',
    a: 'Haan. Hum partner banks ke through EMI arrange karte hain. 5kW residential system ke liye approx ₹2,200/month se start hota hai. Aur agar solar ki savings zyada hain toh Day-1 se net profit hota hai.',
  },
  {
    q: 'Net metering kya hota hai?',
    a: 'Net metering mein aapka meter bidirectional ho jata hai. Jab solar zyada bijli banata hai, wo grid mein jaata hai aur credit milta hai. Mahine ke end mein sirf net consumption ka bill aata hai. Hum DVVNL, PVVNL aur sabhi DISCOMs ke liye ye handle karte hain.',
  },
  {
    q: 'Kya rental property mein solar lag sakta hai?',
    a: 'Property owner ki written permission chahiye. Agar aap khud owner hain toh koi issue nahi. Hum rental property cases mein guidance de sakte hain.',
  },
  {
    q: 'System ki warranty kitne saal ki hoti hai?',
    a: 'Tier-1 panels ki performance warranty 25 saal hoti hai. Inverter warranty typically 5-10 saal. Hamari installation workmanship guarantee 1 saal.',
  },
  {
    q: 'Kya aap Mathura ya Firozabad mein bhi service dete ho?',
    a: 'Haan! Hum Agra + 50km radius mein service dete hain jisme Mathura, Vrindavan, Firozabad, Fatehpur Sikri, Tundla, Achhnera, Bah aur Kheragarh shamil hain. Apna pincode check kar sakte hain hamare pincode checker mein.',
  },
  {
    q: 'Factory ya commercial building ke liye solar lagwane mein kya alag hota hai?',
    a: 'Commercial installations mein 40% accelerated depreciation milti hai pehle saal — iska matlab hai ki system cost ka 40% income tax mein save hota hai. ROI typically residential se better hota hai.',
  },
  {
    q: 'Maintenance kitni zyada hoti hai?',
    a: 'Solar panels ki maintenance bahut kam hoti hai — mahine mein ek baar saai se dhona enough hai. Hamara system monitoring app se aap production track kar sakte hain. Annual inspection hum karte hain.',
  },
];

export const WHATSAPP_URL = (message) =>
  `https://wa.me/${BUSINESS.contacts.whatsapp}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_DEFAULT_MSG = `Namaste SolarHub! Main solar installation ke baare mein jaankari chahta/chahti hun. Kripya mujhse sampark karein.`;
