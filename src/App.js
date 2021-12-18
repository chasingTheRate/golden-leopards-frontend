import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {
  Container,
} from 'react-bootstrap';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import GLNavBar from './components/glNavBar';
import GLSeasons from "./components/glSeasons";
import GLGames from "./components/glGames";
import GLPlayers from "./components/glPlayers";
import GLHome from "./components/glHome";
import GLLineup from "./components/glLineup";

function App() {
  return (
    <div className="App">
      <Router>
        <Container fluid style={{height: '100%', padding: 0, display: 'flex', flexDirection: 'column'}}>
          <GLNavBar style={{flexGrow: 1}}></GLNavBar>
          <Container fluid style={{flexGrow: 1, paddingTop: ".75rem", paddingBottom: ".75rem"}}>
            <Switch>
              <Route exact path="/">
                <GLHome></GLHome>
              </Route>
              <Route path="/seasons">
                <GLSeasons></GLSeasons>
              </Route>
              <Route path="/games">
                <GLGames></GLGames>
              </Route>
              <Route path="/players">
                <GLPlayers></GLPlayers>
              </Route>
              <Route path="/lineup">
                <GLLineup></GLLineup>
              </Route>
            </Switch>
          </Container>
        </Container>
      </Router>
    </div>
  );
}

export default App;
