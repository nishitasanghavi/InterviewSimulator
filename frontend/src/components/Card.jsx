// src/components/Card.jsx
import React from 'react';

function Card({ children, className = '', hoverable = true }) {
  return (
    <div 
      className={`
        bg-white rounded-xl shadow-sm border border-gray-100 p-5 
        ${hoverable ? 'transition-all duration-200 hover:shadow-md hover:border-purple-100' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;