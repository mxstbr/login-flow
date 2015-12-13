import request from './fakeRequest';

/**
 * Authentication lib
 * @type {Object}
 */
var auth = {
  /**
   * Logs a user in
   * @param  {string}   username The username of the user
   * @param  {string}   password The password of the user
   * @param  {Function} callback Called after a user was logged in on the remote server
   */
  login(username, password, callback) {
    // If no username or password was specified, throw a field-missing error
    if (this.anyElementsEmpty({ username, password})) {
      callback(false, {
        type: "field-missing"
      });
      return;
    }
    // If there is a token in the localStorage, the user already is
    // authenticated
    if (this.loggedIn()) {
      callback(true);
      return;
    }
    // Post a fake request (see below)
    request.post('/login', { username, password }, (response) => {
      // If the user was authenticated successfully, save a random token to the
      // localStorage
      if (response.authenticated) {
        localStorage.token = response.token;
        callback(true);
      } else {
        // If there was a problem authenticating the user, show an error on the
        // form
        callback(false, response.error);
      }
    });
  },
  /**
   * Logs the current user out
   */
  logout(callback) {
    request.post('/logout', {}, () => {
      callback(true);
    });
  },
  /**
   * Checks if anybody is logged in
   * @return {boolean} True if there is a logged in user, false if there isn't
   */
  loggedIn() {
    return !!localStorage.token;
  },
  /**
   * Registers a user in the system
   * @param  {string}   username The username of the user
   * @param  {string}   password The password of the user
   * @param  {Function} callback Called after a user was registered on the remote server
   */
  register(username, password, callback) {
    // If no username or password was specified, throw a field-missing error
    if (this.anyElementsEmpty({ username, password})) {
      callback(false, {
        type: "field-missing"
      });
      return;
    }
    // Post a fake request
    request.post('/register', { username, password }, (response) => {
      // If the user was successfully registered, log them in
      if (response.registered === true) {
        this.login(username, password, callback);
      } else {
        // If there was a problem registering, show the error
        callback(false, response.error);
      }
    });
  },
  /**
   * Checks if any elements of a JSON object are empty
   * @param  {object} elements The object that should be checked
   * @return {boolean}         True if there are empty elements, false if there aren't
   */
  anyElementsEmpty(elements) {
    for (let element in elements) {
      if (!elements[element]) {
        return true;
      }
    }
    return false;
  },
  onChange() {}
}

module.exports = auth;
