import {
  Container,
} from 'react-bootstrap';

import GLScheduleListItem from './glScheduleListItem';

const GLScheduleList = ({ data = [] }) => {
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
        ></GLScheduleListItem>)}
      </div>
    </Container>
  );
}

export default GLScheduleList;