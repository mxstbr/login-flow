import server from './fakeServer';

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

module.exports = fakeRequest;
