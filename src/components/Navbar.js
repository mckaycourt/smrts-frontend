import React from 'react';
import PropTypes from 'prop-types';

const Navbar = props => (
  <nav>
    <div className="nav-wrapper blue darken-1">
      <a href="/" className="brand-logo center">SMRTS Simulator</a>
    </div>
  </nav>
);

Navbar.propTypes = {
    options: PropTypes.array,
};

export default Navbar;
