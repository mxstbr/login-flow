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

/**
 * Logs an user in
 * @param  {string} username The username of the user to be logged in
 * @param  {string} password The password of the user to be logged in
 */
export function login(username, password) {
  return (dispatch) => {
    // Show the loading indicator, hide the last error
    dispatch(sendingRequest(true));
    removeLastFormError();
    // Use auth.js to fake a request
    auth.login(username, password, (success, err) => {
      // When the request is finished, hide the loading indicator
      dispatch(sendingRequest(false));
      dispatch(setAuthState(success));
      if (success === true) {
        // If the login worked, forward the user to the dashboard and clear the form
        history.replaceState(null, '/dashboard');
        dispatch(changeForm({
          username: "",
          password: ""
        }));
      } else {
        requestFailed(err);
      }
    });
  }
}

/**
 * Logs the current user out
 */
export function logout() {
  return (dispatch) => {
    dispatch(sendingRequest(true));
    auth.logout((success, err) => {
      if (success === true) {
        dispatch(sendingRequest(false));
        dispatch(setAuthState(false));
        history.replaceState(null, '/');
      } else {
        requestFailed(err);
      }
    });
  }
}

/**
 * Registers a user
 * @param  {string} username The username of the new user
 * @param  {string} password The password of the new user
 */
export function register(username, password) {
  return (dispatch) => {
    // Show the loading indicator, hide the last error
    dispatch(sendingRequest(true));
    removeLastFormError();
    // Use auth.js to fake a request
    auth.register(username, password, (success, err) => {
      // When the request is finished, hide the loading indicator
      dispatch(sendingRequest(false));
      dispatch(setAuthState(success));
      if (success) {
        // If the register worked, forward the user to the homepage and clear the form
        history.replaceState(null, '/dashboard');
        dispatch(changeForm({
          username: "",
          password: ""
        }));
      } else {
        requestFailed(err);
      }
    });
  }
}

/**
 * Sets the authentication state of the application
 * @param {boolean} newState True means a user is logged in, false means no user is logged in
 */
export function setAuthState(newState) {
  return { type: SET_AUTH, newState };
}

/**
 * Sets the form state
 * @param  {object} newState          The new state of the form
 * @param  {string} newState.username The new text of the username input field of the form
 * @param  {string} newState.password The new text of the password input field of the form
 * @return {object}                   Formatted action for the reducer to handle
 */
export function changeForm(newState) {
  return { type: CHANGE_FORM, newState };
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}

let lastErrType = "";

/**
 * Called when a request failes
 * @param  {object} err An object containing information about the error
 * @param  {string} err.type The js-form__err + err.type class will be set on the form
 */
function requestFailed(err) {
  // Remove the class of the last error so there can only ever be one
  removeLastFormError();
  const form = document.querySelector('.form-page__form-wrapper');
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

/**
 * Removes the last error from the form
 */
function removeLastFormError() {
  const form = document.querySelector('.form-page__form-wrapper');
  form.classList.remove('js-form__err--' + lastErrType);
}
