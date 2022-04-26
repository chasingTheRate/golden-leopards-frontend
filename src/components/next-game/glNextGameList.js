import {
  Container,
} from 'react-bootstrap';

import GLNextGameItem from './glNextGameItem';

const GLNextGameList = ({ data = [] }) => {
  return (
    <Container 
      fluid 
      style={{ 
        padding: '12px',
        width: '100%',
      }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        { data.map((d, i) => <GLNextGameItem 
          key={ `ngli-${i}` } 
          record={ d }
        ></GLNextGameItem>)}
      </div>
    </Container>
  );
}

export default GLNextGameList;