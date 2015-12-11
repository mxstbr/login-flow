/*
 * HomePage
 *
 * This is the first thing users see of the app
 * Route: /
 *
 */

import { setAuthState } from '../../actions/AppActions';
import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from '../Nav.react';
import { connect } from 'react-redux';

class HomePage extends Component {
	render() {
    const dispatch = this.props.dispatch;
    const { loggedIn } = this.props.data;

    return (
			<div className="wrapper">
				{/* Change the copy based on the authentication status */}
				{loggedIn ? (
					<h1>Welcome, you are logged in!</h1>
				) : (
					<div>
						<h1>Welcome to Login Flow!</h1>
						<p>This app is a demo of a login flow written in React.js. It uses Redux for data management, ServiceWorker and AppCache for offline capability, Webpack as a bundler, PostCSS as a CSS preprocessor and a wide variety of small plugins.</p>
						<Link to="/login" className="btn btn--login">Log In</Link>
						<Link to="/register" className="btn btn--register">Register</Link>
					</div>
				)}
			</div>
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
export default connect(select)(HomePage);
