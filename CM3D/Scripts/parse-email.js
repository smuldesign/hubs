const capitalize = s => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export function generateEmailName(email) {
  let playerName = email.split("@")[0];
  const playerNameArray = playerName.split(".");
  playerName = "";
  playerNameArray.forEach(e => {
    if (typeof e !== "string") return "";
    playerName += capitalize(e);
    playerName += " ";
  });
  return playerName;
}
