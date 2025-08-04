import React from 'react'
import { ValidationError } from '@/lib/validation'

interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

interface FormSelectProps {
  label: string
  name: string
  value: string | number
  onChange: (value: string | number) => void
  options: SelectOption[]
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: ValidationError[]
  className?: string
  helpText?: string
  multiple?: boolean
}

export default function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  errors = [],
  className = '',
  helpText,
  multiple = false
}: FormSelectProps) {
  const fieldErrors = errors.filter(error => error.field === name)
  const hasError = fieldErrors.length > 0

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value
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
      
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        disabled={disabled}
        multiple={multiple}
        className={`
          block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
          bg-white focus:outline-none focus:ring-pink-500 focus:border-pink-500
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          ${hasError ? 'border-red-300 ring-red-100' : ''}
        `}
        aria-invalid={hasError}
        aria-describedby={helpText ? `${name}-help` : hasError ? `${name}-error` : undefined}
      >
        {!multiple && placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      
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
