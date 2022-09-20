import React from "react";

const PlayerGameStats = ({ gameStats }) => {

  const formatStats = (stats) => {

    let strArray = [];
    stats.forEach(s => {
      switch (s.value) {
        case 0:
          break;
        case 1:
          strArray.push(s.displayname);
          break;
        default:
          strArray.push(`${s.displayname} (${s.value})`);
          break;
      }
    })
    return strArray.join(', ');
  }

  return (
    <div style={{ paddingBottom: '8px', fontSize: 'x-small'}}>
      <div>
        { gameStats.goals.reduce((partialSum, a) => partialSum + a.value, 0) > 0 &&
          <div>
            <span style={{ fontWeight: 500, color: 'grey'}}>Goals: </span>
            <span style={{ fontWeight: 600, color: 'black'}}>{ formatStats(gameStats.goals) }</span>
          </div>
        }
        { gameStats.assists.reduce((partialSum, a) => partialSum + a.value, 0) > 0 &&
          <div>
            <span style={{ fontWeight: 500, color: 'grey'}}>Assists: </span>
            <span style={{ fontWeight: 600, color: 'black'}}>{ formatStats(gameStats.assists) }</span>
          </div>
        }
        { gameStats.saves.reduce((partialSum, a) => partialSum + a.value, 0) > 0 &&
          <div>
            <span style={{ fontWeight: 500, color: 'grey'}}>Saves: </span>
            <span style={{ fontWeight: 600, color: 'black'}}>{ formatStats(gameStats.saves) }</span>
          </div>
        }
        { gameStats.defensive_tackles.reduce((partialSum, a) => partialSum + a.value, 0) > 0 > 0 &&
          <div>
            <span style={{ fontWeight: 500, color: 'grey'}}>Def Tackles: </span>
            <span style={{ fontWeight: 600, color: 'black'}}>{ formatStats(gameStats.defensive_tackles) }</span>
          </div>
        }
      </div>
    </div>
  );
}

export default PlayerGameStats;
