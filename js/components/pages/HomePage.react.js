/*
 * HomePage
 *
 * This is the first thing users see of the app
 * Route: /
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from '../Nav.react';
import { connect } from 'react-redux';

class HomePage extends Component {
	render() {
    const dispatch = this.props.dispatch;
    const { loggedIn } = this.props.data;

    return (
			<article>
				<div>
					<section className="text-section">
						{/* Change the copy based on the authentication status */}
						{loggedIn ? (
							<h1>Welcome to Login Flow, you are logged in!</h1>
						) : (
							<h1>Welcome to Login Flow!</h1>
						)}
						<p>This application demonstrates what a React.js based register/login workflow might look like on the Frontend. I used <a href="https://github.com/mxstbr/react-boilerplate">react-boilerplate</a> as a starting point — the app thus uses Redux, PostCSS, react-router, ServiceWorker, AppCache, bcrypt and lots more. See the full source code on <a href="https://github.com/mxstbr/login-flow">Github</a>!</p>
						<p>The default username is <code>AzureDiamond</code> and the default password is <code>hunter2</code>, but feel free to register new users! The registered users are saved to localStorage, so they'll persist across page reloads.</p>
						{loggedIn ? (
							<Link to="/dashboard" className="btn btn--dash">Dashboard</Link>
						) : (
							<div>
								<Link to="/login" className="btn btn--login">Login</Link>
								<Link to="/register" className="btn btn--register">Register</Link>
							</div>
						)}
					</section>
					<section className="text-section">
						<h2>Features</h2>
						<ul>
							<li>
								<p>Using <a href="https://github.com/gaearon/react-hot-loader"><strong>react-hot-loader</strong></a>, your changes in the CSS and JS get reflected in the app instantly without refreshing the page. That means that the <strong>current application state persists</strong> even when you change something in the underlying code! For a very good explanation and demo watch Dan Abramov himself <a href="https://www.youtube.com/watch?v=xsSnOQynTHs">talking about it at react-europe</a>.</p>
							</li>
							<li>
								<p><a href="https://github.com/gaearon/redux"><strong>Redux</strong></a> is a much better implementation of a flux–like, unidirectional data flow. Redux makes actions composable, reduces the boilerplate code and makes hot–reloading possible in the first place. For a good overview of redux check out the talk linked above or the <a href="https://gaearon.github.io/redux/">official documentation</a>!</p>
							</li>
							<li>
								<p><a href="https://github.com/postcss/postcss"><strong>PostCSS</strong></a> is like Sass, but modular and capable of much more. PostCSS is, in essence, just a wrapper for plugins which exposes an easy to use, but very powerful API. While it is possible to <a href="https://github.com/jonathantneal/precss">replicate Sass features</a> with PostCSS, PostCSS has an <a href="http://postcss.parts">ecosystem of amazing plugins</a> with functionalities Sass cannot even dream about having.</p>
							</li>
							<li>
								<p><a href="https://github.com/rackt/react-router"><strong>react-router</strong></a> is used for routing in this boilerplate. react-router makes routing really easy to do and takes care of a lot of the work.</p>
							</li>
							<li>
								<p><a href="http://www.html5rocks.com/en/tutorials/service-worker/introduction/"><strong>ServiceWorker</strong></a> and <a href="http://www.html5rocks.com/en/tutorials/appcache/beginner/"><strong>AppCache</strong></a> make it possible to use the application offline. As soon as the website has been opened once, it is cached and available without a network connection. <a href="https://developer.chrome.com/multidevice/android/installtohomescreen"><strong><code>manifest.json</code></strong></a> is specifically for Chrome on Android. Users can add the website to the homescreen and use it like a native app!</p>
							</li>
						</ul>
					</section>
					<section className="text-section">
						<h2>Authentication</h2>
						<p>Authentication happens in <code>js/utils/auth.js</code>, using <code>fakeRequest.js</code> and <code>fakeServer.js</code>. <code>fakeRequest</code> is a fake XMLHttpRequest wrapper with a similar syntax to <code>request.js</code> which simulates network latency. <code>fakeServer</code> responds to the fake HTTP requests and pretends to be a real server, storing the current users in localStorage with the passwords encrypted using <code>bcrypt</code>.
						</p>
						<p>To change it to real authentication, you’d only have to import <code>request.js</code> instead of <code>fakeRequest.js</code> and have a server running somewhere.</p>
					</section>
				</div>
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
export default connect(select)(HomePage);
