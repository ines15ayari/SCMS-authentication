import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/HomePage/Home';
import Signup from './components/SignUp/signUp';


function App() {
  return (
    <BrowserRouter>
     <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Register" component={Signup} />
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;