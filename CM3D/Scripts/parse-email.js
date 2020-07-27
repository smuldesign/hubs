const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export function generateEmailName(email) {
  let playerName = email.split("@")[0];
  const playerNameArray = playerName.split(".");
  playerNameArray.forEach(email => {
    if (typeof email !== "string") return "";
    capitalize(email);
    playerName += email;
  });
  return playerName;
}
