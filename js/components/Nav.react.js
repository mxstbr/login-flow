/**
 *
 * Nav.react.js
 *
 * This component renders the navigation bar
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router';
import auth from '../utils/auth';

class Nav extends Component {
  render() {
    // Render either the sign in and register buttons, or the logout button
    // based on the current authentication state.
    const navButtons = this.props.loggedIn ? (
        <a href="#" className="btn btn--signin btn--nav" onClick={(evt) => {
          evt.preventDefault();
          auth.logout();
        }}>Logout</a>
      ) : (
        <div>
          <Link to="/register" className="btn btn--signin btn--nav">Register</Link>
          <Link to="/login" className="btn btn--signin btn--nav">Sign in</Link>
        </div>
      );

    return(
      <div className="nav">
        <div className="nav__wrapper">
          <Link to="/" className="nav__logo-wrapper"><h1 className="nav__logo">Login Flow</h1></Link>
          { navButtons }
        </div>
      </div>
    );
  }
}

Nav.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired
}

export default Nav;
