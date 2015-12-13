/**
 *
 * auth.js
 *
 * Fake remote authentication using bcrypt and localStorage to persist across
 * page reloads.
 *
 */

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
let users;

/**
 * Main object that gets exported as a module and accessed in other files
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
      this.onChange(false, {
        type: "field-missing"
      });
      return;
    }
    // If there is a token in the localStorage, the user already is
    // authenticated
    if (this.loggedIn()) {
      this.onChange(true);
      if (callback) callback(true);
      return;
    }
    // Post a fake request (see below)
    fakeRequest.post('/login', { username, password }, (response) => {
      // If the user was authenticated successfully, save a random token to the
      // localStorage
      if (response.authenticated) {
        localStorage.token = response.token;
        this.onChange(true);
        if (callback) callback(true);
      } else {
        // If there was a problem authenticating the user, show an error on the
        // form
        this.onChange(false, response.error);
        if (callback) callback(false);
      }
    });
  },
  /**
   * Logs the current user out
   */
  logout() {
    fakeRequest.post('/login', {}, () => {
      this.onChange(false);
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
      this.onChange(false, {
        type: "field-missing"
      });
      return;
    }
    // Post a fake request
    fakeRequest.post('/register', { username, password }, (response) => {
      // If the user was successfully registered, log them in
      if (response.registered === true) {
        this.login(username, password, callback);
      } else {
        // If there was a problem registering, show the error
        this.onChange(false, response.error);
        if (callback) callback(false);
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

/**
 * Fake XMLHttpRequest wrapper with a syntax similar to the much used request.js
 * @type {Object}
 */
var fakeRequest = {
  /**
   * Pretends to post to a remote server with fake network latency
   * @param  {string}    endpoint The endpoint of the server that should be contacted
   * @param  {?object}   data     The data that should be transferred to the server
   * @param  {?function} callback Called after the server successfully did it's thing
   */
  post(endpoint, data, callback) {
    // Delay the call by a random amount between 100ms and 2000ms
    // to simulate network latency
    setTimeout(() => {
      switch (endpoint) {
        case '/login':
          server.login(data.username, data.password, callback);
          break;
        case '/register':
          server.register(data.username, data.password, callback);
          break;
        case '/logout':
          server.logout(callback);
          break;
        default:
          break;
      }
    }, (Math.random() * 2000) + 100);
  }
}

// Fake server implementation
var server = {
  /**
   * Populates the users var, similar to seeding a database in the real world
   */
  init() {
    // Get the previous users from localStorage if they exist, otherwise
    // populates the localStorage
    if (localStorage.users === undefined) {
      users = {
        "max": bcrypt.hashSync("password1", salt)
      };
      localStorage.users = JSON.stringify(users);
    } else {
      users = JSON.parse(localStorage.users);
    }
  },
  /**
   * Pretends to log a user in
   *
   * @param {string} username The username of the user to log in
   * @param {string} password The password of the user to register
   * @param {?callback} callback Called after a user is logged in
   */
  login(username, password, callback) {
    const userExists = this.doesUserExist(username);
    // If the user exists and the password fits log the user in
    if (userExists && bcrypt.compareSync(password, users[username])) {
      if (callback) callback({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      });
    } else {
      if (userExists) {
        // If the password is wrong, throw the password-wrong error
        var error = {
          type: "password-wrong"
        }
      } else {
        // If the user doesn't exist, throw the user-doesnt-exist
        var error = {
          type: "user-doesnt-exist"
        }
      }
      if (callback) callback({
        authenticated: false,
        error: error
      });
    }
  },
  /**
   * Pretends to register a user
   *
   * @param {string} username The username of the user to register
   * @param {string} password The password of the user to register
   * @param {?callback} callback Called after a user is registered
   */
  register(username, password, callback) {
    if (!this.doesUserExist(username)) {
      // If the username isn't used, hash the password with bcrypt to store it
      // in localStorage
      users[username] = bcrypt.hashSync(password, salt);
      localStorage.users = JSON.stringify(users);
      if (callback) callback({
        registered: true
      });
    } else {
      // If the username is already in use, throw the username-exists error
      if (callback) callback({
        registered: false,
        error: {
          type: "username-exists"
        }
      });
    }
  },
  /**
   * Pretends to log a user out
   * @param  {Function} callback Called after the user was logged out
   */
  logout(callback) {
    delete localStorage.token;
    if (callback) callback();
  },
  /**
   * Checks if a username exists in the db
   * @param  {string} username The username that should be checked
   * @return {boolean}         True if the username exists, false if it doesn't
   */
  doesUserExist(username) {
    return !(users[username] === undefined);
  }
}

server.init();
