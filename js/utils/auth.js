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

// Get the previous users from localStorage if they exist, otherwise populate
// the localStorage
if (localStorage.users === undefined) {
  users = {
    "max": bcrypt.hashSync("password1", salt)
  };
  localStorage.users = JSON.stringify(users);
} else {
  users = JSON.parse(localStorage.users);
}

//
// Main object
//
var auth = {
  // Logs a user in
  // username and password are two strings, callback is a function
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
    // Post a fake request to a fake endpoint (see below)
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
  // Logs a user out
  logout() {
    delete localStorage.token;
    this.onChange(false);
  },
  // Checks if somebody is logged in
  loggedIn() {
    return !!localStorage.token;
  },
  // Registers a user in the system
  // username and password are two strings, callback a function
  register(username, password, callback) {
    // If no username or password was specified, throw a field-missing error
    if (this.anyElementsEmpty({ username, password})) {
      this.onChange(false, {
        type: "field-missing"
      });
      return;
    }
    // Post a fake request to a fake endpoint
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
  // Checks if any elements of a JSON object are empty
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

// Fake request lib with a similar syntax to request.js
var fakeRequest = {
  // Pretend to post to a remote server
  post(endpoint, data, callback) {
    // Delay the call by a random amount between 500ms and 2000ms
    // to simulate network latency
    setTimeout(() => {
      switch (endpoint) {
        case '/login':
          server.login(data.username, data.password, callback);
          break;
        case '/register':
          server.register(data.username, data.password, callback);
          break;
        default:
          break;
      }
    }, (Math.random() * 2000) + 500);
  }
}

// Fake server implementation
var server = {
  // Petrends to log a user in
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
  // Pretends to register a user
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
  // Checks if a user exists
  doesUserExist(username) {
    return !(users[username] === undefined);
  }
}
