
const goldenLeopardApiBasePath = process.env.NEXT_PUBLIC_GL_API_BASE_PATH;

export const getTournamentSchedule = async () => {
  const results = await (await fetch(`${goldenLeopardApiBasePath}/api/schedules/tournaments`)).json();
  return results ? results : [];
}

export const getRoster = async () => {
  const results = await (await fetch(`${goldenLeopardApiBasePath}/api/roster`)).json();
  return results ? results : [];
}

export const getPlayersWithCurrentStats = async () => {
  const results = await (await fetch(`${goldenLeopardApiBasePath}/api/players`)).json();
  return results ? results : [];
}

export const getPlayerStatsByPlayerId = async ({id, year, leagueId}) => {
  const results = await (await fetch(`${goldenLeopardApiBasePath}/api/players/${id}/stats?year=${year}&leagueId=${leagueId}`)).json();
  return results ? results : [];
}

export const getPlayerById = async (id,) => {
  const results = await (await fetch(`${goldenLeopardApiBasePath}/api/players/${id}`)).json();
  return results ? results : [];
}

export const getSeasonSchedule = async () => {
  const results = await (await fetch(`${goldenLeopardApiBasePath}/api/schedules/season`)).json();
  return results ? results : [];
}

export const getFriendlies = async () => {
  const results = await (await fetch(`${goldenLeopardApiBasePath}/api/schedules/friendlies`)).json();
  return results ? results : [];
}

export const createTournament = async (tournament) => {
 
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tournament)
  };

  await fetch(`${goldenLeopardApiBasePath}/api/schedules/tournaments`, requestOptions);
}

export const updateTournamentPlayers = async (id, tournament) => {

  const modifiedTournaments = Object.assign({}, tournament);

  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(modifiedTournaments)
  };
  await fetch(`${goldenLeopardApiBasePath}/api/schedules/tournaments/${id}/players`, requestOptions);
}

export const updateGamePlayers = async (id, game) => {

  const modifiedGame = Object.assign({}, game);

  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(modifiedGame)
  };
  await fetch(`${goldenLeopardApiBasePath}/api/schedules/games/${id}/players`, requestOptions);
}

export const updateTournament = async (id, tournament) => {

  const modifiedTournaments = Object.assign({}, tournament);

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

export const getLeagueSchedule = async (id) => {
  try {
    let results = await (await fetch(`${goldenLeopardApiBasePath}/api/leagues/${id}/schedule`)).json();
    return results ? results : [];
  } catch (e) {
    return [];
  }
}

export const getLogos = async () => {
  const results = await (await fetch(`${goldenLeopardApiBasePath}/api/logos`)).json();
  return results ? results : [];
}

export const updateGame = async (game) => {
 
  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game)
  };

  await fetch(`${goldenLeopardApiBasePath}/api/schedules/games/${game.id}`, requestOptions);
}

export const createGame = async (game) => {
 
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game)
  };

  await fetch(`${goldenLeopardApiBasePath}/api/schedules/games`, requestOptions);
}

export const createLeague = async (league) => {
 
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(league)
  };

  await fetch(`${goldenLeopardApiBasePath}/api/leagues/`, requestOptions);
}

export const updateLeague = async (league) => {
 
  const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(league)
  };

  await fetch(`${goldenLeopardApiBasePath}/api/leagues/${league.id}`, requestOptions);
}

export const updatePlayerGameStats = async (gameId, playerGameStats) => {
 
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(playerGameStats)
  };

  await fetch(`${goldenLeopardApiBasePath}/api/schedules/games/${gameId}/updatePlayerGameStats`, requestOptions);
}



export const clearCache = async () => {
  await fetch(`${goldenLeopardApiBasePath}/api/clearCache`);
}