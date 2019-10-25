import React, { Component } from 'react';

class Login extends Component {

  render() {
    return (
      <div className="login">
        <form onSubmit={this.props.handleLogin}>
          <div className="login-input">
            <label>Username</label>
            <input type="text" name="username" value={this.props.username} onChange={this.props.handleChange} />
          </div>
          <div className="login-input">
            <label>Password</label>
            <input type="password" name="password" value={this.props.password} onChange={this.props.handleChange} />
          </div>
          <div className="login-input login-submit">
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }

}

export default Login;
