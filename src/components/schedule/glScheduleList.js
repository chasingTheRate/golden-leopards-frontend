import {
  Container,
} from 'react-bootstrap';

import GLScheduleListItem from './glScheduleListItem';

const GLScheduleList = ({ data = [], onEditGame, onEditPlayerGameStats }) => {
  return (
    <Container 
      fluid 
      style={{ 
        padding: '12px 12px 0px 12px', 
      }}>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        { data.map((d, i) => <GLScheduleListItem 
          key={ `sli-${i}` } 
          record={ d }
          eventKey={ i.toString() }
          onEditGame= { onEditGame }
          onEditPlayerGameStats = { onEditPlayerGameStats }
        ></GLScheduleListItem>)}
      </div>
    </Container>
  );
}

export default GLScheduleList;