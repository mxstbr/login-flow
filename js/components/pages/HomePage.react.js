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
			<div className="wrapper">
				{/* Change the copy based on the authentication status */}
				{loggedIn ? (
					<h1>Welcome, you are logged in!</h1>
				) : (
					<article>
						<section className="text-section">
							<h1>Login Flow</h1>
							<p>This application demonstrates what a React.js based register/login workflow might look like on the Frontend. I used <a href="https://github.com/mxstbr/react-boilerplate">react-boilerplate</a> as a starting point — the app thus uses Redux, PostCSS, react-router, ServiceWorker, AppCache, bcrypt and lots more.</p>
							<Link to="/login" className="btn btn--login">Log In</Link>
							<Link to="/register" className="btn btn--register">Register</Link>
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
					</article>
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
