import {
  Container,
} from 'react-bootstrap';

import GLGameResultList from './glGameResultList';

const GLNextGameContainer = ({ data = [] }) => {
  return (
    <Container className="game-result-container">
      <div className='gl-game-result-container'>
        <span>Last Game</span>
      </div>
      <GLGameResultList data= { data }></GLGameResultList>
  </Container>
  );
}

export default GLNextGameContainer;