export const getUserIP = async () => {
  try {
    const res = await fetch("https://api.ipify.org?format=json");

    const data = await res.json();

    return data.ip;
  } catch (err) {
    console.error("IP fetch failed", err);
    return null;
  }
};
