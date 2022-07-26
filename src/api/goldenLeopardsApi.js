
const goldenLeopardApiBasePath = process.env.NEXT_PUBLIC_GL_API_BASE_PATH;

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

  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(modifiedTournaments)
  };
  await fetch(`${goldenLeopardApiBasePath}/api/schedules/tournaments/${id}`, requestOptions);
}

export const getNextGames = async () => {
  const results = await (await fetch(`${goldenLeopardApiBasePath}/api/schedules/nextgames`)).json();
  return results ? results : [];
}

export const getLastGameResults = async () => {
  const results = await (await fetch(`${goldenLeopardApiBasePath}/api/schedules/last-game-results`)).json();
  return results ? results : [];
}

export const getLeagues = async () => {
  const results = await (await fetch(`${goldenLeopardApiBasePath}/api/leagues`)).json();
  return results ? results : [];
}