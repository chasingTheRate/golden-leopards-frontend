import {
  Container,
} from 'react-bootstrap';

import GLPlayersListItem from './glPlayersListItem';

const GLPlayersList = ({ players = [] }) => {
  return (
    <Container 
      fluid
      style={{ 
        padding: '12px 0px 0px 0px', 
      }}>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        { players.map((p, i) => <GLPlayersListItem 
          key={ `pli-${i}` } 
          player={ p }
        ></GLPlayersListItem>)}
      </div>
    </Container>
  );
}

export default GLPlayersList;