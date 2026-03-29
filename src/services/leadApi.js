const DEMO_STORAGE_KEY = 'unnati_solar_demo_leads';

const wait = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const getApiConfig = () => {
  const baseUrl = (process.env.REACT_APP_API_BASE_URL || '').trim();
  const endpoint = (process.env.REACT_APP_LEAD_ENDPOINT || '/api/leads').trim();
  return { baseUrl, endpoint };
};

const createPayload = (formData, quoteData) => {
  const now = new Date().toISOString();

  return {
    schemaVersion: '1.0.0',
    submittedAt: now,
    lead: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    },
    project: {
      systemType: formData.systemType,
      propertyType: formData.propertyType,
      monthlyBillInr: Number(formData.monthlyBill),
      pincode: formData.pincode,
      message: formData.message || null
    },
    quoteEstimate: {
      recommendedSystemKw: quoteData.estimatedSystemSizeKw,
      monthlySavingsInr: quoteData.estimatedMonthlySavings,
      yearlySavingsInr: quoteData.estimatedYearlySavings,
      installationCostInr: quoteData.installationCost,
      subsidyInr: quoteData.estimatedSubsidy,
      netInvestmentInr: quoteData.netInvestment,
      paybackYears: Number(quoteData.paybackYears)
    },
    source: {
      channel: 'website',
      pagePath: typeof window !== 'undefined' ? window.location.pathname : '/',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
    }
  };
};

const saveLeadInDemoMode = async (payload) => {
  await wait(600);

  const savedLeads = JSON.parse(localStorage.getItem(DEMO_STORAGE_KEY) || '[]');
  const record = {
    id: `demo_${Date.now()}`,
    status: 'new',
    ...payload
  };

  savedLeads.push(record);
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(savedLeads));

  return {
    ok: true,
    mode: 'demo',
    id: record.id
  };
};

export const submitLeadInquiry = async (formData, quoteData) => {
  const payload = createPayload(formData, quoteData);
  const { baseUrl, endpoint } = getApiConfig();

  if (!baseUrl) {
    const demoResult = await saveLeadInDemoMode(payload);
    return {
      ...demoResult,
      payload
    };
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Lead submission failed with status ${response.status}`);
  }

  const responseBody = await response.json().catch(() => ({}));

  return {
    ok: true,
    mode: 'api',
    id: responseBody.id || `lead_${Date.now()}`,
    payload,
    response: responseBody
  };
};

export const getDemoLeads = () => JSON.parse(localStorage.getItem(DEMO_STORAGE_KEY) || '[]');
