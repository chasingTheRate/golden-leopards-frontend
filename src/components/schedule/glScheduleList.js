import {
  Container,
} from 'react-bootstrap';

import GLScheduleListItem from './glScheduleListItem';

const GLScheduleList = () => {
  return (
    <Container 
      fluid 
      style={{ 
        padding: 3, 
      }}>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <GLScheduleListItem></GLScheduleListItem>
      </div>
    </Container>
  );
}

export default GLScheduleList;