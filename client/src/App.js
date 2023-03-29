import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/HomePage/Home';
import SignIn from './components/SignIn/signIn';
import Projects from './components/ProjectsPage/Projects';
import Tickets from './components/TicketsPage/Tickets';

function App() {
  return (
    <BrowserRouter>
     <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/projects" component={Projects}/>
        <Route exact path="/project/:projectName" component={Tickets}/>
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;