
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

const goldenLeopardApiBasePath = process.env.REACT_APP_GL_API_BASE_PATH;

export const getTournamentSchedule = async () => {
  const results = await (await fetch(`${goldenLeopardApiBasePath}/api/schedules/tournaments`)).json();
  return results ? results : [];
}

export const getRoster = async () => {
  const results = await (await fetch(`${goldenLeopardApiBasePath}/api/roster`)).json();
  return results ? results : [];
}

export const getSeasonSchedule = async () => {
  const results = await (await fetch(`${goldenLeopardApiBasePath}/api/schedules/season`)).json();
  return results ? results : [];
}

export const updateTournament = async (id, tournament) => {

  const modifiedTournaments = Object.assign({}, tournament);

  //  Remove airtable computed & id fields

  delete modifiedTournaments.recordNumber;
  delete modifiedTournaments.interested;
  delete modifiedTournaments.id;

  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(modifiedTournaments)
  };
  await fetch(`${goldenLeopardApiBasePath}/api/schedules/tournaments/${id}`, requestOptions);
}

export const getNextGames = async () => {
  const results = await (await fetch(`${goldenLeopardApiBasePath}/api/schedules/nextgames`)).json();
  console.log(results);
  return results ? results : [];
}