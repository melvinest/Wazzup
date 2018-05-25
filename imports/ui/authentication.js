import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Accounts } from 'meteor/accounts-base';
import Avatars from '../api/avatars';
import faker from 'faker';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange(value, type) {
    if (type === 'username') this.setState({ username: value });
    if (type === 'password') this.setState({ password: value });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      if (this.props.status === 'Login') this.loginAccount();
      if (this.props.status === 'Register') this.registerAccount();
    }
  }

  handleClick() {
    if (this.props.status === 'Login') this.loginAccount();
    if (this.props.status === 'Register') this.registerAccount();
  }

  loginAccount() {
    const { username, password } = this.state;
    if (this.props.status === 'Login') {
      Meteor.loginWithPassword(username, password, (err) => {
        if (err && err.error === 403) FlowRouter.redirect('/login?status=error');
        else FlowRouter.redirect('/login?status=verified');
      });
    }
  }

  registerAccount() {
    const { username, password } = this.state;
    if (this.props.status === 'Register') {
      Accounts.createUser({ username, password }, (err) => {
        if (err && err.error === 403) FlowRouter.redirect('/register?status=error');
        else {
          const userId = Meteor.userId();
          const avatar = faker.image.avatar();
          Avatars.insert({ avatar, userId });
          FlowRouter.redirect('/register?status=verified');
        }
      });
    }
  }

  render() {
    const { status, check } = this.props;
    let registrationLink = null;
    let message = null;
    if (status === 'Login') registrationLink = (<a className="new-user" href="/register">New User?</a>);
    if (check === 'wrong credentials') message = (<div className="err-message">Invalid username/password</div>);
    if (check === 'username already taken') message = (<div className="err-message">Username already taken</div>);
    return (
      <div className="auth-background">
        <div className="auth-banner">Welcome to Wazzup!</div>
        <div className="auth-box">
          <h2 className="auth-label">{status}</h2>
          {message}
          <p>
            Username: <input
              onChange={(e) => { this.handleChange(e.target.value, 'username'); }}
              type="text"
              value={this.state.username}
              name="username"
              onKeyPress={(e) => { this.handleKeyPress(e); }}
            />
          </p>
          <p>
            Password: <input
              type="password"
              name="password"
              onChange={(e) => { this.handleChange(e.target.value, 'password'); }}
              value={this.state.password}
              onKeyPress={(e) => { this.handleKeyPress(e); }}
            />
          </p>
          {registrationLink}
          <input onClick={() => { this.handleClick(); }} className="auth-button" type="submit" value={status} />
        </div>
      </div>
    );
  }
}

export default Login;
