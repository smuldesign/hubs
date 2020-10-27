const capitalize = s => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export function generateEmailName(email) {
  if (!email) return;
  let playerName = email.split("@")[0];
  const playerNameArray = playerName.split(".");
  if(playerNameArray[0].length === 1){
    playerName = "";
    playerNameArray.forEach(e => {
      if (typeof e !== "string") return "";
      playerName += capitalize(e);
      playerName += " ";
    });
    return playerName;
  }
  else{
    return playerNameArray[0];
  }
}
