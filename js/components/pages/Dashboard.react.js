import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  componentWillMount() {
		// If the user is already logged in, forward them to the homepage
		if (this.props.data.loggedIn === false) {
			if (this.props.location.state && this.props.location.state.nextPathname) {
				this.props.history.replaceState(null, this.props.location.state.nextPathname)
			} else {
				this.props.history.replaceState(null, '/')
			}
		}
	}

  render() {
    return (
      <article>
        <section className="text-section">
          <h1>Dashboard</h1>
          <p>Welcome, you are logged in! To have a look at the code behind this application, go to <a href="https://github.com/mxstbr/login-flow">Github</a>. To run it locally:</p>
          <ol>
            <li><p>Clone the repo using <code>git clone git@github.com:mxstbr/login-flow</code></p></li>
            <li><p>Run <code>npm install</code> to install the dependencies.</p></li>
            <li><p>Run <code>npm start</code> to start the local web server</p></li>
            <li><p>Go to <a href="http://localhost:3000"><code>http://localhost:3000</code></a> and you should see it running!</p></li>
          </ol>
          <p>If you registered a new user, the credentials are now securely saved to localStorage. The next time you visit the website with this browser, you will be able to login with that username/password combination.</p>
        </section>
      </article>
    );
  }
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Dashboard);
