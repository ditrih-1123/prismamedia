/** Currencies for countries in nav (Czech, Slovakia, Hungary, Moldova, Georgia, Armenia) */
export const CURRENCIES = [
  { code: "EUR", label: "Slovakia", symbol: "€", name: "Euro" },
  { code: "CZK", label: "Czech", symbol: "Kč", name: "Czech koruna" },
  { code: "HUF", label: "Hungary", symbol: "Ft", name: "Hungarian forint" },
  { code: "MDL", label: "Moldova", symbol: "L", name: "Moldovan leu" },
  { code: "GEL", label: "Georgia", symbol: "₾", name: "Georgian lari" },
  { code: "AMD", label: "Armenia", symbol: "֏", name: "Armenian dram" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

const RATES_API = "https://cdn.moneyconvert.net/api/latest.json";

export type RatesResponse = {
  base: string;
  rates: Record<string, number>;
  ts?: string;
};

export async function fetchRates(): Promise<Record<string, number>> {
  const res = await fetch(RATES_API);
  if (!res.ok) throw new Error("Failed to fetch rates");
  const data: RatesResponse = await res.json();
  return data.rates ?? {};
}
