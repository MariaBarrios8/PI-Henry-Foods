import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/Landing/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        {/*<Route path='home/:id' component={Detail}*/}
      </Switch>
      <h1>Created by Gurokawa</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
