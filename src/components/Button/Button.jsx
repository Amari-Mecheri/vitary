import React from 'react';
import './Button.css';

const Button = ({ children, className, fullWidth, ...props }) => {
  // Define a class to apply full-width styling if needed
  const buttonClass = `button ${className || ''} ${fullWidth ? 'full-width' : ''}`;
  
  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
