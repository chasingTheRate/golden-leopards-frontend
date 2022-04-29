import {
  Container,
} from 'react-bootstrap';

import GLNextGameList from './glNextGameList';

const GLNextGameContainer = ({ data = [] }) => {
  return (
    <Container className="next-game-container">
      <div className='gl-next-game-title-container'>
        <span>Up Next</span>
      </div>
      <GLNextGameList data= { data }></GLNextGameList>
  </Container>
  );
}

export default GLNextGameContainer;