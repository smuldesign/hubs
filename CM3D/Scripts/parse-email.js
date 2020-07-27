// Start cm3d
export function generateEmailName(email) {
  const playerName = email.split("@")[0];
  const playerNameArray = playerName.split(".");
  playerNameArray.forEach(email)
}

const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
