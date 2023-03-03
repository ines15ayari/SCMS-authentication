import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';import Login from './components/Login';
import Signup from './components/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;