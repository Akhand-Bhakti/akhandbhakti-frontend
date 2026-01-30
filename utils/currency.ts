export const currencySymbol = (currency: string) => {
  switch (currency) {
    case "INR":
      return "₹";
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    default:
      return currency; // fallback (safe)
  }
};
