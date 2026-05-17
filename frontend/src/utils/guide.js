export const getGuide = (risk, type) => {
  if (risk === "Low") {
    return " Safe! Keep using strong security practices. Enable 2FA.";
  }

  if (risk === "Medium") {
    return " Medium Risk! Change your password and avoid reusing credentials.";
  }

  if (risk === "High") {
    return " High Risk! Immediately change passwords, enable 2FA, and monitor your accounts.";
  }

  return "No guidance available.";
};