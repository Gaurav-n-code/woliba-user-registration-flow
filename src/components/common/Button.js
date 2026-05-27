import React from 'react';
import Spinner from './Spinner';

/**
 * Button — Flexible button with loading state
 * Props: variant ('primary'|'secondary'|'ghost'), loading, disabled, onClick, type, children
 */
const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  ...rest
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1';

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white focus:ring-blue-500',
    secondary: 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 focus:ring-gray-400',
    ghost: 'text-blue-600 hover:text-blue-800 underline-offset-2 hover:underline bg-transparent focus:ring-blue-400',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant] || variants.primary} w-full py-2.5 px-4 ${className}`}
      {...rest}
    >
      {loading && <Spinner size="sm" color="current" />}
      {children}
    </button>
  );
};

export default Button;
