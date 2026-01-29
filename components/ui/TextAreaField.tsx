'use client';

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface TextAreaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<any>;
  error?: FieldError;
  helpText?: string;
  rows?: number;
  className?: string;
  disabled?: boolean;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  placeholder,
  required = false,
  register,
  error,
  helpText,
  rows = 4,
  className = '',
  disabled = false,
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name)}
        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm ${
          error
            ? 'border-red-300 text-red-900 placeholder-red-300'
            : 'border-gray-300 text-gray-900 placeholder-gray-400'
        } ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
      />
      
      {error && (
        <p className="text-sm text-red-600">{error.message}</p>
      )}
      
      {helpText && !error && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
};

export default TextAreaField;