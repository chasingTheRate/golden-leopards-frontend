import {
  Container,
} from 'react-bootstrap';

import GLGameResultItem from './glGameResultItem';

const GLGameResultList = ({ data = [] }) => {
  return (
    <Container 
      fluid 
      style={{ 
        padding: '12px',
        width: '100%',
      }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        { data.map((d, i) => <GLGameResultItem 
          key={ `grli-${i}` } 
          record={ d }
          eventKey={ i.toString() }
        ></GLGameResultItem>)}
      </div>
    </Container>
  );
}

export default GLGameResultList;