// src/components/Button.js
import React from 'react';

const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`rounded-lg px-6 py-2 font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-solar.accent ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;