import React from 'react';

/**
 * SelectInput — Styled native select dropdown
 * Props: label, name, value, onChange, options, error, required, disabled
 */
const SelectInput = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  required = false,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="label">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-describedby={error ? `${name}-error` : undefined}
        aria-invalid={!!error}
        className={`form-input appearance-none ${error ? 'form-input-error' : ''} ${
          !value ? 'text-gray-400' : 'text-gray-900'
        } ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-70' : ''}`}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-gray-900">
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${name}-error`} role="alert" className="error-text">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectInput;
