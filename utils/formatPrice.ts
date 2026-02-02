export const formatPrice = (value: number, currency?: string): string => {
  if (typeof value !== "number") return "";

  // Indian numbering for INR, international otherwise
  const locale = currency === "INR" ? "en-IN" : "en-US";

  return new Intl.NumberFormat(locale).format(value);
};
