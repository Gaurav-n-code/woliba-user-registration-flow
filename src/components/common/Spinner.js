import React from 'react';

/**
 * Spinner — Animated loading indicator
 * Props: size ('sm'|'md'|'lg'), color ('white'|'blue'|'current')
 */
const Spinner = ({ size = 'md', color = 'blue' }) => {
  const sizes = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-8 w-8' };
  const colors = {
    white: 'border-white border-t-transparent',
    blue: 'border-blue-600 border-t-transparent',
    current: 'border-current border-t-transparent',
    gray: 'border-gray-400 border-t-transparent',
  };

  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block rounded-full border-2 animate-spin ${sizes[size]} ${colors[color] || colors.blue}`}
    />
  );
};

export default Spinner;
