import React from 'react'
import { ValidationError } from '@/lib/validation'

interface FormCheckboxProps {
  label: string
  name: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  errors?: ValidationError[]
  className?: string
  helpText?: string
  required?: boolean
}

export default function FormCheckbox({
  label,
  name,
  checked,
  onChange,
  disabled = false,
  errors = [],
  className = '',
  helpText,
  required = false
}: FormCheckboxProps) {
  const fieldErrors = errors.filter(error => error.field === name)
  const hasError = fieldErrors.length > 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={name}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            className={`
              h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded
              disabled:cursor-not-allowed disabled:opacity-50
              ${hasError ? 'border-red-300' : ''}
            `}
            aria-invalid={hasError}
            aria-describedby={helpText ? `${name}-help` : hasError ? `${name}-error` : undefined}
          />
        </div>
        
        <div className="ml-3 text-sm">
          <label 
            htmlFor={name}
            className={`font-medium text-gray-700 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          {helpText && (
            <p id={`${name}-help`} className="text-gray-500">
              {helpText}
            </p>
          )}
        </div>
      </div>
      
      {hasError && (
        <div id={`${name}-error`} className="text-sm text-red-600 ml-7">
          {fieldErrors.map((error, index) => (
            <p key={index}>{error.message}</p>
          ))}
        </div>
      )}
    </div>
  )
}
