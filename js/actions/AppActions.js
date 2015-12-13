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
    auth.login(username, password, (loggedIn) => {
      // When the request is finished, hide the loading indicator
      dispatch(sendingRequest(false));
      dispatch(actuallySetAuthState(loggedIn));
      if (loggedIn === true) {
        // If the login worked, forward the user to the homepage
        history.replaceState(null, '/');
      }
    });
  }
}

export function logout() {
  return (dispatch) => {
    dispatch(sendingRequest(true));
    auth.logout(() => {
      dispatch(sendingRequest(false));
      dispatch(actuallySetAuthState(false));
    });
  }
}

export function register(username, password) {
  return (dispatch) => {
    dispatch(sendingRequest(true));
    auth.register(username, password, (loggedIn) => {
      dispatch(sendingRequest(false));
      dispatch(actuallySetAuthState(loggedIn));

      if (loggedIn) {
        history.replaceState(null, '/');
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
