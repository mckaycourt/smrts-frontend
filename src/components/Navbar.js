import React from 'react';
import PropTypes from 'prop-types';

const Navbar = props => (
    <div>
        <ul>
            {
                props.options.map((option, i) => (
                    <li key={i}>
                        <a href='#'>{option}</a>
                    </li>
                ))
            }
        </ul>
    </div>
);

Navbar.propTypes = {
    options: PropTypes.array,
};

export default Navbar;