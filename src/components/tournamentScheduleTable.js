
import {
  Container,
} from 'react-bootstrap';

import TournmamentListItem from './tournamentListItem';

const TournamentScheduleTable = ({ addPlayerToTournament, data }) => {
  return (
    <Container 
      fluid 
      style={{ 
        padding: 3, 
      }}>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        { data.map((d, i) => <TournmamentListItem 
          key={ `tli-${i}` } 
          record={ d }
          onAdd= { addPlayerToTournament } 
        ></TournmamentListItem>)}
      </div>
    </Container>
  );
}

export default TournamentScheduleTable;