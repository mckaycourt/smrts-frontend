import React from 'react';
import PropTypes from 'prop-types';

const Navbar = props => (
  <nav>
    <div className="nav-wrapper blue darken-1">
      <a href="#" className="brand-logo center">SMRTS Simulator</a>
    </div>
  </nav>
);

Navbar.propTypes = {
    options: PropTypes.array,
};

export default Navbar;


/*
  <nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo center">Logo</a>
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">JavaScript</a></li>
      </ul>
    </div>
  </nav>
*/

/*
  <nav>
    <div class="nav-wrapper">
      <div class="col s12">
        <a href="#!" class="breadcrumb">First</a>
        <a href="#!" class="breadcrumb">Second</a>
        <a href="#!" class="breadcrumb">Third</a>
      </div>
    </div>
  </nav>
*/