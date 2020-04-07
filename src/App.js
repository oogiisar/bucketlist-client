import React, { Component } from 'react';
import Header from './components/Header';
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


        </section>

      </main>
    );
  }
}

export default App;
