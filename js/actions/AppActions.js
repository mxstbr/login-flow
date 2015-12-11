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

export function setAuthState(newState) {
  return function(dispatch) {
    return dispatch(actuallySetAuthState(newState));
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
