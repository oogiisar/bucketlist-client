import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import './App.css';

class App extends Component {

  constructor(props){
      super(props)
      this.state = {
        loggedIn: 'false'
      }

  }

  // Used to force rerender when someone logs in or out.
  handleLogin = (loggedIn) => {
    this.setState({
      loggedIn: loggedIn
    })
  }

  render() {
    return (
      <main className='App'>
        <Header 
          handleLogin={this.handleLogin}
          loggedIn={this.state.loggedIn}
        />
        <section id="content">

          <Route 
            exact path='/'
            render={(props) => 
              <Login 
                handleLogin={this.handleLogin}
              />
            }
          />


        </section>

      </main>
    );
  }
}

export default App;
