import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/Landing/LandingPage';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
      </Switch>
      <h1>Henry Food Proyect</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
