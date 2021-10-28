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

import GLNavBar from './components/glNavBar';
import GLSeasons from "./components/glSeasons";
import GLGames from "./components/glGames";
import GLPlayers from "./components/glPlayers";
import GLHome from "./components/glHome";



function App() {
  return (
    <div className="App">
      <Router>
        <GLNavBar></GLNavBar>
        <Container fluid style={{paddingTop: ".75rem"}}>
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
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
