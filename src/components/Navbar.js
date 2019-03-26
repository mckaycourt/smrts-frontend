import React from 'react';
import PropTypes from 'prop-types';

const Navbar = props => (
<div className="navbar-fixed">
  <nav>
    <div className="nav-wrapper blue darken-1">
      <a href="/" className="brand-logo center">SMRTS Simulator</a>
      <ul className="left hide-on-med-and-down">
        <li><a href="/"><i className="material-icons">arrow_back</i></a></li>
      </ul>
    </div>
  </nav>
</div>
);

Navbar.propTypes = {
    options: PropTypes.array,
};

export default Navbar;
