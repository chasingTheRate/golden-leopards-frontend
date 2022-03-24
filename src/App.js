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
import GLHome from "./components/glHome";
import GLTournaments from "./components/glTournaments";
import GLSchedule from "./components/schedule/glSchedule";


function App() {
  return (
    <div className="App">
      <Router>
        <Container fluid className='master-container' style={{height: '100%', padding: 0, display: 'flex', flexDirection: 'column' }}>
          <GLNavBar style={{flexGrow: 1}}></GLNavBar>
          <Container fluid style={{flexGrow: 1, paddingTop: ".75rem", paddingBottom: ".75rem"}}>
            <Switch>
              <Route exact path="/">
                <GLHome></GLHome>
              </Route>
              <Route exact path="/schedule">
                <GLSchedule></GLSchedule>
              </Route>
              <Route exact path="/tournaments">
                <GLTournaments></GLTournaments>
              </Route>
            </Switch>
          </Container>
        </Container>
      </Router>
    </div>
  );
}

export default App;
