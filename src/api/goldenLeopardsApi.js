
// export const getSeasons = async () => {
//   const results = await (await fetch(`https://golden-leopards-backend.herokuapp.com/api/seasons`)).json();
//   return results ? results : [];
// }

// export const getGames = async () => {
//   const results = await (await fetch(`https://golden-leopards-backend.herokuapp.com/api/games`)).json();
//   return results ? results : [];
// }

// export const getPlayers = async () => {
//   const results = await (await fetch(`https://golden-leopards-backend.herokuapp.com/api/players`)).json();
//   return results ? results : [];
// }

// export const getPlayersStats = async () => {
//   const results = await (await fetch(`https://golden-leopards-backend.herokuapp.com/api/stats/players`)).json();
//   return results ? results : [];
// }

// export const getTeamRecord = async () => {
//   const results = await (await fetch(`https://golden-leopards-backend.herokuapp.com/api/stats/teamRecord`)).json();
//   return results ? results : [];
// }

export const getTournamentSchedule = async () => {
  const results = await (await fetch(`https://golden-leopards-backend.herokuapp.com/api/schedules/tournaments`)).json();
  console.log(results);
  return results ? results : [];
}