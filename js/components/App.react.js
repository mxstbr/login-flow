/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

// Import stuff
import React, { Component } from 'react';
import Nav from './Nav.react';
import { connect } from 'react-redux';
import { setAuthState, changeForm, sendingRequest } from '../actions/AppActions';
import auth from '../utils/auth';

class App extends Component {
  render() {
    return(
      <div className="wrapper">
        <Nav loggedIn={this.props.data.loggedIn} history={this.props.history} location={this.props.location} dispatch={this.props.dispatch} />
        { this.props.children }
      </div>
    )
  }

  componentWillMount() {
    // Init
    this.lastErrType = "";

    // This gets called whenever somebody tries to take any authentication
    // actions. (e.g. trying to login/register)
    auth.onChange = (loggedIn, err) => {
      // Set the application authentication state
      this.props.dispatch(setAuthState(loggedIn));

      if (err !== undefined) {
        // If there was an error, set the application loading state
  		  this.props.dispatch(sendingRequest(false));
        // Remove the class of the last error so there can only ever be one
        const form = document.querySelector('.form-page__form-wrapper');
        form.classList.remove('js-form__err--' + this.lastErrType);
        // And add the respective classes
        form.classList.add('js-form__err');
        form.classList.add('js-form__err-animation');
        form.classList.add('js-form__err--' + err.type);
        this.lastErrType = err.type;
        // Remove the animation class after the animation is finished, so it
        // can play again on the next error
        setTimeout(() => {
          form.classList.remove('js-form__err-animation');
        }, 150);
      } else {
        // If there was no error, reset the form
        this.props.dispatch(this.props.dispatch(changeForm({
          "username": "",
          "password": ""
        })));
      }
    };
  }
}

export default App;

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
