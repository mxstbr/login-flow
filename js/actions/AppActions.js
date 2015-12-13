/*
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * 3) (optional) Add an async function like this:
 *    export function asyncYourAction(var) {
 *        return function(dispatch) {
 *             // Do async stuff here
 *             return dispatch(yourAction(var));
 *        }
 *    }
 *
 *    If you add an async function, remove the export from the function
 *    created in the second step
 */

import { SET_AUTH, CHANGE_FORM, SENDING_REQUEST } from '../constants/AppConstants';
import auth from '../utils/auth';
import history from '../utils/history';

export function setAuthState(newState) {
  return (dispatch) => {
    return dispatch(actuallySetAuthState(newState));
  }
}

export function login(username, password) {
  return (dispatch) => {
    // Show the loading indicator
    dispatch(sendingRequest(true));
    // Use auth.js to fake a request
    auth.login(username, password, (success, err) => {
      // When the request is finished, hide the loading indicator
      dispatch(sendingRequest(false));
      dispatch(actuallySetAuthState(success));
      if (success === true) {
        // If the login worked, forward the user to the homepage and clear the form
        history.replaceState(null, '/');
        changeForm({
          username: "",
          password: ""
        });
      } else {
        requestFailed(err);
      }
    });
  }
}

export function logout() {
  return (dispatch) => {
    dispatch(sendingRequest(true));
    auth.logout((success, err) => {
      if (success === true) {
        dispatch(sendingRequest(false));
        dispatch(actuallySetAuthState(false));
      } else {
        requestFailed(err);
      }
    });
  }
}

export function register(username, password) {
  return (dispatch) => {
    dispatch(sendingRequest(true));
    auth.register(username, password, (success, err) => {
      dispatch(sendingRequest(false));
      dispatch(actuallySetAuthState(success));

      if (success) {
        history.replaceState(null, '/');
        changeForm({
          username: "",
          password: ""
        });
      } else {
        requestFailed(err);
      }
    });
  }
}

function actuallySetAuthState(newState) {
  return { type: SET_AUTH, newState };
}

export function changeForm(newState) {
  return { type: CHANGE_FORM, newState };
}

export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}

let lastErrType = "";

function requestFailed(err) {
  // Remove the class of the last error so there can only ever be one
  const form = document.querySelector('.form-page__form-wrapper');
  form.classList.remove('js-form__err--' + lastErrType);
  // And add the respective classes
  form.classList.add('js-form__err');
  form.classList.add('js-form__err-animation');
  form.classList.add('js-form__err--' + err.type);
  lastErrType = err.type;
  // Remove the animation class after the animation is finished, so it
  // can play again on the next error
  setTimeout(() => {
    form.classList.remove('js-form__err-animation');
  }, 150);
}
