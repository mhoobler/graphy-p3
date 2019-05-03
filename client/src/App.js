import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav';

import Home from './pages/home';
import About from './pages/about';
import Projects from './pages/projects';
import SignIn from './pages/signin';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Nav />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/projects' component={Projects}/>
          <Route exact path='/signin' component={() => <SignIn foo={false} /> } />
          <Route exact path='/signup' component={() => <SignIn foo={true} /> } />
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

//10 minutes
export default App;
