import React from 'react'
import { ValidationError } from '@/lib/validation'

interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'tel'
  value: string | number
  onChange: (value: string | number) => void
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: ValidationError[]
  className?: string
  helpText?: string
  autoComplete?: string
}

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  errors = [],
  className = '',
  helpText,
  autoComplete
}: FormFieldProps) {
  const fieldErrors = errors.filter(error => error.field === name)
  const hasError = fieldErrors.length > 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value
    onChange(newValue)
  }

  return (
    <div className={`space-y-1 ${className}`}>
      <label 
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`
          block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
          placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          ${hasError ? 'border-red-300 ring-red-100' : ''}
        `}
        aria-invalid={hasError}
        aria-describedby={helpText ? `${name}-help` : hasError ? `${name}-error` : undefined}
      />
      
      {helpText && (
        <p id={`${name}-help`} className="text-sm text-gray-500">
          {helpText}
        </p>
      )}
      
      {hasError && (
        <div id={`${name}-error`} className="text-sm text-red-600">
          {fieldErrors.map((error, index) => (
            <p key={index}>{error.message}</p>
          ))}
        </div>
      )}
    </div>
  )
}
