// Exchange rates - Base currency is USD
// These are fallback rates; real-time rates are fetched from API
export const CURRENCY_RATES: {
  [key: string]: {
    code: string;
    symbol: string;
    rate: number;
    region: string;
  };
} = {
  // North America
  US: { code: "USD", symbol: "$", rate: 1, region: "North America" },
  CA: { code: "CAD", symbol: "C$", rate: 1.36, region: "North America" },
  MX: { code: "MXN", symbol: "Mex$", rate: 16.99, region: "North America" },

  // South America
  BR: { code: "BRL", symbol: "R$", rate: 4.97, region: "South America" },
  AR: { code: "ARS", symbol: "$", rate: 920, region: "South America" },
  CL: { code: "CLP", symbol: "$", rate: 920, region: "South America" },
  CO: { code: "COP", symbol: "$", rate: 4100, region: "South America" },
  PE: { code: "PEN", symbol: "S/.", rate: 3.65, region: "South America" },

  // Europe
  GB: { code: "GBP", symbol: "£", rate: 0.79, region: "Europe" },
  DE: { code: "EUR", symbol: "€", rate: 0.92, region: "Europe" },
  FR: { code: "EUR", symbol: "€", rate: 0.92, region: "Europe" },
  IT: { code: "EUR", symbol: "€", rate: 0.92, region: "Europe" },
  ES: { code: "EUR", symbol: "€", rate: 0.92, region: "Europe" },
  NL: { code: "EUR", symbol: "€", rate: 0.92, region: "Europe" },
  BE: { code: "EUR", symbol: "€", rate: 0.92, region: "Europe" },
  AT: { code: "EUR", symbol: "€", rate: 0.92, region: "Europe" },
  CH: { code: "CHF", symbol: "CHF", rate: 0.88, region: "Europe" },
  SE: { code: "SEK", symbol: "kr", rate: 10.5, region: "Europe" },
  NO: { code: "NOK", symbol: "kr", rate: 10.7, region: "Europe" },
  DK: { code: "DKK", symbol: "kr", rate: 6.87, region: "Europe" },
  PL: { code: "PLN", symbol: "zł", rate: 4.0, region: "Europe" },
  CZ: { code: "CZK", symbol: "Kč", rate: 23.5, region: "Europe" },
  RU: { code: "RUB", symbol: "₽", rate: 98, region: "Europe" },
  TR: { code: "TRY", symbol: "₺", rate: 33.5, region: "Europe" },

  // Africa
  NG: { code: "NGN", symbol: "₦", rate: 1500, region: "Africa" },
  ZA: { code: "ZAR", symbol: "R", rate: 18.5, region: "Africa" },
  EG: { code: "EGP", symbol: "£", rate: 49, region: "Africa" },
  KE: { code: "KES", symbol: "KSh", rate: 130, region: "Africa" },
  GH: { code: "GHS", symbol: "₵", rate: 12, region: "Africa" },
  MA: { code: "MAD", symbol: "د.م.", rate: 10.2, region: "Africa" },
  TN: { code: "TND", symbol: "د.ت", rate: 3.15, region: "Africa" },
  ET: { code: "ETB", symbol: "Br", rate: 56, region: "Africa" },
  UG: { code: "UGX", symbol: "Sh", rate: 3680, region: "Africa" },
  TZ: { code: "TZS", symbol: "TSh", rate: 2580, region: "Africa" },
  CM: { code: "XAF", symbol: "FCFA", rate: 610, region: "Africa" },
  SN: { code: "XOF", symbol: "CFA", rate: 610, region: "Africa" },

  // Asia
  IN: { code: "INR", symbol: "₹", rate: 83.5, region: "Asia" },
  CN: { code: "CNY", symbol: "¥", rate: 7.24, region: "Asia" },
  JP: { code: "JPY", symbol: "¥", rate: 149, region: "Asia" },
  SG: { code: "SGD", symbol: "S$", rate: 1.35, region: "Asia" },
  MY: { code: "MYR", symbol: "RM", rate: 4.73, region: "Asia" },
  TH: { code: "THB", symbol: "฿", rate: 35.5, region: "Asia" },
  ID: { code: "IDR", symbol: "Rp", rate: 15900, region: "Asia" },
  PH: { code: "PHP", symbol: "₱", rate: 56, region: "Asia" },
  VN: { code: "VND", symbol: "₫", rate: 24600, region: "Asia" },
  BD: { code: "BDT", symbol: "Tk", rate: 104, region: "Asia" },
  PK: { code: "PKR", symbol: "₨", rate: 278, region: "Asia" },
  LK: { code: "LKR", symbol: "Rs", rate: 330, region: "Asia" },
  TW: { code: "TWD", symbol: "NT$", rate: 32, region: "Asia" },
  KR: { code: "KRW", symbol: "₩", rate: 1305, region: "Asia" },
  HK: { code: "HKD", symbol: "HK$", rate: 7.81, region: "Asia" },
  AE: { code: "AED", symbol: "د.إ", rate: 3.67, region: "Asia" },
  SA: { code: "SAR", symbol: "﷼", rate: 3.75, region: "Asia" },
  IL: { code: "ILS", symbol: "₪", rate: 3.68, region: "Asia" },

  // Oceania
  AU: { code: "AUD", symbol: "A$", rate: 1.54, region: "Oceania" },
  NZ: { code: "NZD", symbol: "NZ$", rate: 1.69, region: "Oceania" },

  // Fallback
  default: { code: "USD", symbol: "$", rate: 1, region: "Default" },
};

// Store for real-time rates
let cachedRates: { [key: string]: number } | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

/**
 * Fetch real-time exchange rates from exchangerate-api.com
 * Free tier allows 1500 requests/month
 * Returns rates relative to USD
 */
export const fetchRealTimeRates = async (): Promise<{
  [key: string]: number;
}> => {
  try {
    const now = Date.now();

    // Return cached rates if still fresh
    if (cachedRates && now - lastFetchTime < CACHE_DURATION) {
      console.log("Using cached exchange rates");
      return cachedRates;
    }

    console.log("Fetching fresh exchange rates from API...");

    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD",
    );

    if (!response.ok) {
      throw new Error(`API error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.rates) {
      cachedRates = data.rates;
      lastFetchTime = now;
      console.log("Exchange rates updated successfully");
      return data.rates;
    } else {
      throw new Error("No rates returned from API");
    }
  } catch (error) {
    console.error("Error fetching real-time exchange rates:", error);
    // Return cached rates if available, otherwise return empty object
    return cachedRates || {};
  }
};

/**
 * Get currency with real-time or fallback rates
 */
export const getCountryCurrency = (
  countryCode: string | null,
  realTimeRates?: { [key: string]: number },
) => {
  if (!countryCode) return CURRENCY_RATES.default;

  const baseCurrency = CURRENCY_RATES[countryCode] || CURRENCY_RATES.default;

  // If real-time rates are available, update the rate
  if (realTimeRates && realTimeRates[baseCurrency.code]) {
    return {
      ...baseCurrency,
      rate: realTimeRates[baseCurrency.code],
    };
  }

  return baseCurrency;
};

export const convertPrice = (
  priceInUSD: number,
  currencyRate: number,
): number => {
  if (!currencyRate || currencyRate <= 0) {
    console.warn("Invalid currency rate:", currencyRate);
    return Math.round(priceInUSD);
  }
  return Math.round(priceInUSD * currencyRate);
};

export const formatPrice = (
  amount: number,
  currencySymbol: string,
  currencyCode: string,
): string => {
  // Validate inputs
  if (!amount || amount < 0 || !currencySymbol || !currencyCode) {
    return "$0.00";
  }

  // For currencies that don't use decimals
  if (["JPY", "KRW", "VND", "IDR"].includes(currencyCode)) {
    return `${currencySymbol}${Math.round(amount).toLocaleString()}`;
  }

  // For currencies with very large amounts that typically show no decimals
  if (["NGN", "KES", "UGX", "TZS", "XAF", "XOF"].includes(currencyCode)) {
    return `${currencySymbol}${Math.round(amount).toLocaleString()}`;
  }

  // For most other currencies - show 2 decimal places
  return `${currencySymbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
