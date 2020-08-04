import React from 'react';
// import { FaRegMoon } from 'react-icons/fa';
import PropTypes from 'prop-types';




export const Footer = () => {
    
    return (
        <div className="footer" data-testid="footer">
            <h4>
                ANDRE TORRES © 2020 
            </h4>
        </div>
    )

};
Footer.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
};