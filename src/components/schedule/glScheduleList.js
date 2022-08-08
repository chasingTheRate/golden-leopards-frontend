import {
  Container,
} from 'react-bootstrap';

import GLScheduleListItem from './glScheduleListItem';

const GLScheduleList = ({ data = [], onEditGame }) => {
  return (
    <Container 
      fluid 
      style={{ 
        padding: '12px', 
      }}>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        { data.map((d, i) => <GLScheduleListItem 
          key={ `sli-${i}` } 
          record={ d }
          eventKey={ i.toString() }
          onEditGame= { onEditGame }
        ></GLScheduleListItem>)}
      </div>
    </Container>
  );
}

export default GLScheduleList;