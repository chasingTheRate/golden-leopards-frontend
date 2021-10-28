
export const getSeasons = async () => {
  const results = await (await fetch(`https://golden-leopards.herokuapp.com/api/seasons`)).json();
  return results ? results : [];
}

export const getGames = async () => {
  const results = await (await fetch(`https://golden-leopards.herokuapp.com/api/games`)).json();
  return results ? results : [];
}

export const getPlayers = async () => {
  const results = await (await fetch(`https://golden-leopards.herokuapp.com/api/players`)).json();
  return results ? results : [];
}