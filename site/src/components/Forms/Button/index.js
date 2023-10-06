import React from 'react';
import './style.scss';

const Buttton = ({ children, ...otherProps }) => {
    return (
        <button className="btn" {...otherProps}>
            {children}
        </button>
    );
}

export default Buttton;