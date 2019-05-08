import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav';

import Home from './pages/Home';
import UserPage from './pages/UserPage';
import Projects from './pages/Projects';
import SignIn from './pages/Signin';
import GraphPage from './pages/GraphPage';

class App extends Component {
  state = {
    user: null
  }

  setUser = (userInfo) => {
    this.setState({
      user: userInfo
    })
  }

  render() {
    const App = () => (
      <div>
        <Nav user={this.state.user} />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/user' component={UserPage}/>
          <Route exact path='/projects' component={Projects}/>
          <Route exact path='/signin' render={() => <SignIn {...this.props} setUser={this.setUser} user={this.state.user} newUser={false} /> } />
          <Route exact path='/signup' render={() => <SignIn {...this.props} setUser={this.setUser} user={this.state.user} newUser={true} /> } />
          <Route exact path='/graphs' render={() => <GraphPage {...this.props} user={this.state.user} />} />
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
