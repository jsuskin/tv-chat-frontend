import React, { Component } from 'react';
import ConversationsList from './components/ConversationsList';
import Login from './components/Login';
import { HEADERS } from './constants';
import './App.css'

class App extends Component {
  state = {
    username: '',
    password: '',
    loggedIn: false,
    token: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = e => {
    e.preventDefault();
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password
        }
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.jwt);
        return data.jwt ? this.setState({
          loggedIn: true,
          token: data.jwt
        }) : console.log('please log in')
      });

      this.setState({
        username: '',
        password: ''
      });
  }

  render() {
    return (
      <div className="App">
        {this.state.loggedIn ? <ConversationsList token={this.state.token} /> : <Login username={this.state.username} password={this.state.password} handleLogin={this.handleLogin} handleChange={this.handleChange} />}
      </div>
    );
  }

}

export default App;

// import React from 'react';
// import Sidebar from './components/Sidebar';
// import MessagesList from './components/MessagesList';
// import AddMessage from './components/AddMessage';
// import './App.css';

// class App extends React.Component {
  // handleChange = e => {
  //   console.log(e);
  // }
  //
  // handleKeyPress = e => {
  //   console.log(e.key)
  // }

  // render() {
    // return (
      {/*<div id="container">
        <Sidebar />
        <section id="main">
          <MessagesList />
          <AddMessage handleKeyPress={this.handleKeyPress} />
        </section>
      </div>*/}
//     );
//   }
// }
//
// export default App;
