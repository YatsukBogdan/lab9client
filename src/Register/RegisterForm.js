import React from 'react';
import Router, { Link, browserHistory } from 'react-router';
import $ from 'jquery';
import md5 from 'js-md5';
import complexity from 'complexity';
import isAuthorized from '../isAuthorized';

const RegisterForm = React.createClass({
  componentDidMount() {
    isAuthorized(this);
    setInterval(this.checkRegisterButtonAvailability, 100);
  },
  getInitialState() {
    return {
      isAuthorized: false,
      buttonDisabled: 'disabled',
      userExist: false,
      badPassword: false,
      secondPasswordEqual: true,
      userExistError: false,
      badPasswordError: false,
      secondPasswordEqualError: true
    }
  },
  registerUser() {
    $.post(
      '/register',
    {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    },
    (reg_data) => {
      if (reg_data.status){
        $.post(
            '/login',
          {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
          },
          (login_data) => {
            if (login_data.logined) {
              browserHistory.push('/');
            }
          });
        }
    });
  },
  checkUsername() {
    $.post(
      '/checkuserexist',
      {
        username: document.getElementById('username').value
      },
      (data) => {
        this.setState({userExist: data.userexist});
        if (data.userexist) {
          this.setState({userExistError: 'User is already exist. Choose another useraname'});
          document.getElementById('username').style.backgroundColor = '#ff6e5b';
        } else {
          this.setState({userExistError: 'Username is free'});
          document.getElementById('username').style.backgroundColor = '#a9f799';
        }
      }
    );
  },
  checkPasswordComplexity() {
    var password = document.getElementById('password').value;
    var options = {
      lowercase    : 1,  // a through z
      digit        : 1,  // 0 through 9
      min          : 8,  // minumum number of characters
    }
    if (complexity.check(password, options)) {
      this.setState({
        badPassword: false,
        badPasswordError: ''
      }, this.checkPasswordEqual());
      document.getElementById('password').style.backgroundColor = '#a9f799';
    } else {
      this.setState({
        badPassword: true,
        badPasswordError: 'Password should contain at least 8 symbols (should be 1 letter and 1 number)'
      }, this.checkPasswordEqual());
      document.getElementById('password').style.backgroundColor = '#ff6e5b';
    }
  },
  checkPasswordEqual() {
    var password = document.getElementById('password').value;
    var password2 = document.getElementById('password2').value;

    if (password == password2) {
      this.setState({
        secondPasswordEqual: true,
        secondPasswordEqualError: ''
      });
      document.getElementById('password2').style.backgroundColor = '#a9f799';
    } else {
      this.setState({
        secondPasswordEqual: false,
        secondPasswordEqualError: 'Second password should be equal to the first'
      });
      document.getElementById('password2').style.backgroundColor = '#ff6e5b';
    }
  },
  checkRegisterButtonAvailability() {
    if (!this.state.userExist && !this.state.badPassword && this.state.secondPasswordEqual &&
        document.getElementById('username').value != '' && document.getElementById('password').value != ''
        && document.getElementById('password2').value != '') {
      this.setState({buttonDisabled: ''});
    } else {
      this.setState({buttonDisabled: 'disabled'});
    }
  },
  render() {
    if (!this.state.isAuthorized) {
      return (
        <section className="login" id="main-content">
            <label>
                Username
                <input onChange={e => this.checkUsername(e)} type="text" name="username" id="username" />
            </label>
            {this.state.userExistError}
            <label>
                Password
                <input onChange={e => this.checkPasswordComplexity(e)} type="password" name="password" id="password" />
            </label>
            {this.state.badPasswordError}
            <label>
                Reapet password
                <input onChange={e => this.checkPasswordEqual(e)} type="password" name="password2" id="password2" />
            </label>
            {this.state.secondPasswordEqualError}
            <button id="login-button" onClick={(e) => this.registerUser(e)} disabled={this.state.buttonDisabled}>Register</button>
        </section>
      )
    } else {
      return (
        <p>You already authorized</p>
      );
    }
  }
});

export default RegisterForm;
