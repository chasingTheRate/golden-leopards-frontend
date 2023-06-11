
import {
  Container,
} from 'react-bootstrap';

import TournmamentListItem from './tournamentListItem';

const TournamentScheduleTable = ({ addPlayerToTournament, data, onEditTournament }) => {
  return (
    <Container fluid className="tournaments-schedule-list-container"
    >
      { data.map((d, i) => <TournmamentListItem 
        key={ `tli-${i}` } 
        record={ d }
        onAdd= { addPlayerToTournament } 
        onEditTournament = { onEditTournament }
      ></TournmamentListItem>)}
    </Container>
  );
}

export default TournamentScheduleTable;