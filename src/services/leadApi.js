// src/services/leadApi.js
// Lead submission service — Supabase primary, localStorage fallback

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { SOLAR_RULES, BUSINESS } from '../content/business';

// ---- UTM capture (persist on first visit) ----
export const captureUtm = () => {
  const params = new URLSearchParams(window.location.search);
  const utm = {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
  };
  if (utm.utm_source) {
    localStorage.setItem('sh_utm', JSON.stringify(utm));
  }
  return JSON.parse(localStorage.getItem('sh_utm') || '{}');
};

// ---- Lead scoring ----
const scoreLeadData = (monthlyBill, propertyType) => {
  if (monthlyBill > 10000 || propertyType !== 'residential') return 'hot';
  if (monthlyBill >= 4000) return 'warm';
  return 'cold';
};

// ---- System size estimation ----
const estimateSystemKw = (monthlyBill, propertyType) => {
  const isCommercial = propertyType !== 'residential';
  // units = bill / tariff; kW = units / 135 (avg units per kW per month)
  const tariff = isCommercial ? SOLAR_RULES.commercialTariffPerUnit : SOLAR_RULES.residentialTariffPerUnit;
  const units = monthlyBill / tariff;
  const kw = units / SOLAR_RULES.avgUnitsPerKwPerMonth;
  return Math.ceil(kw * 10) / 10; // round up to 1 decimal
};

// ---- Telegram notification ----
const sendTelegramNotification = async (lead) => {
  const botToken = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.REACT_APP_TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return;

  const scoreEmoji = lead.score === 'hot' ? '🔥' : lead.score === 'warm' ? '🟡' : '🔵';
  const message = `
${scoreEmoji} *New Solar Lead — SolarHub*

👤 *Name:* ${lead.name}
📞 *Phone:* ${lead.phone}
📍 *Pincode:* ${lead.pincode}
🏠 *Property:* ${lead.property_type}
💡 *Monthly Bill:* ₹${lead.monthly_bill?.toLocaleString('en-IN') || 'N/A'}
⚡ *Est. System:* ${lead.estimated_kw} kW
💰 *Est. Commission:* ₹${lead.estimated_commission?.toLocaleString('en-IN')}
📊 *Score:* ${lead.score?.toUpperCase()}
🌐 *Source:* ${lead.source || 'website'}

_Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}_
`.trim();

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
  } catch (err) {
    console.warn('[SolarHub] Telegram notification failed:', err.message);
  }
};

// ---- WhatsApp prefilled message builder ----
export const buildWhatsAppLeadMessage = (formData) => {
  const bill = Number(formData.monthly_bill);
  const propertyLabel = {
    residential: 'Ghar / Flat',
    shop: 'Dukan / Office',
    factory: 'Factory / Industrial',
    school: 'School / Institution',
    society: 'Society / Apartment',
  }[formData.property_type] || formData.property_type;

  const lines = [
    `Namaste SolarHub! Maine abhi aapki website par quote request submit ki hai.`,
    ``,
    `📋 *Details:*`,
    formData.name?.trim()    && `• Naam: ${formData.name.trim()}`,
    formData.phone?.trim()   && `• Phone: ${formData.phone.trim()}`,
    formData.pincode?.trim() && `• Pincode: ${formData.pincode.trim()}`,
    propertyLabel            && `• Property: ${propertyLabel}`,
    bill > 0                 && `• Monthly Bill: ₹${bill.toLocaleString('en-IN')}/month`,
    formData.emi_interested  && `• EMI mein interested: Haan`,
    formData.timeline        && `• Timeline: ${formData.timeline}`,
    ``,
    `Please mujhse contact karein. Shukriya!`,
  ].filter(Boolean).join('\n');

  return `https://wa.me/${BUSINESS.contacts.whatsapp}?text=${encodeURIComponent(lines)}`;
};

// ---- Demo mode fallback (localStorage) ----
const DEMO_KEY = 'sh_demo_leads';

const saveDemoLead = async (lead) => {
  await new Promise((r) => setTimeout(r, 600));
  const leads = JSON.parse(localStorage.getItem(DEMO_KEY) || '[]');
  const record = { id: `demo_${Date.now()}`, ...lead };
  leads.unshift(record);
  localStorage.setItem(DEMO_KEY, JSON.stringify(leads));
  return { ok: true, mode: 'demo', id: record.id };
};

export const getDemoLeads = () =>
  JSON.parse(localStorage.getItem(DEMO_KEY) || '[]');

// ---- Main submit function ----
export const submitLead = async (formData) => {
  const bill = Number(formData.monthly_bill) || 0;
  const estimatedKw = estimateSystemKw(bill, formData.property_type);
  const estimatedCommission = Math.round(estimatedKw * 1000);
  const score = scoreLeadData(bill, formData.property_type);
  const utm = captureUtm();

  const lead = {
    name: formData.name?.trim(),
    phone: formData.phone?.trim(),
    email: formData.email?.trim() || null,
    pincode: formData.pincode?.trim(),
    city: formData.city || null,
    property_type: formData.property_type || 'residential',
    monthly_bill: bill || null,
    estimated_kw: estimatedKw,
    estimated_commission: estimatedCommission,
    roof_type: formData.roof_type || null,
    timeline: formData.timeline || null,
    emi_interested: formData.emi_interested || false,
    bill_image_url: formData.bill_image_url || null,
    source: formData.source || utm.utm_source || 'website',
    status: 'new',
    score,
  };

  let result;

  if (!isSupabaseConfigured() || !supabase) {
    result = await saveDemoLead(lead);
  } else {
    const { error } = await supabase.from('leads').insert([lead]);
    if (error) {
      console.error('[SolarHub] Supabase insert error:', error);
      result = await saveDemoLead(lead);
      result.supabaseError = error.message;
    } else {
      result = { ok: true, mode: 'supabase', id: 'new' };
    }
  }

  // Fire Telegram notification (non-blocking)
  sendTelegramNotification(lead);

  // Build and return WhatsApp URL for caller to open
  const whatsappUrl = buildWhatsAppLeadMessage(formData);

  return { ...result, lead, whatsappUrl };
};

// ---- Page view tracking ----
export const trackPageView = async (path) => {
  if (!isSupabaseConfigured()) return;
  const sessionId = localStorage.getItem('sh_session') || `s_${Date.now()}`;
  localStorage.setItem('sh_session', sessionId);
  const utm = captureUtm();

  await supabase.from('page_views').insert([{
    path,
    session_id: sessionId,
    ...utm,
  }]);
};

// ---- Legacy compat export (SavingsCalculator still uses this shape) ----
export const submitLeadInquiry = async (formData, quoteData) => {
  return submitLead({
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    pincode: formData.pincode,
    property_type: formData.systemType === 'commercial' ? 'shop' : 'residential',
    monthly_bill: Number(formData.monthlyBill),
    source: 'calculator',
  });
};
