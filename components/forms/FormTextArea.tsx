import React from 'react'
import { ValidationError } from '@/lib/validation'

interface FormTextAreaProps {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: ValidationError[]
  className?: string
  helpText?: string
  rows?: number
  maxLength?: number
}

export default function FormTextArea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  errors = [],
  className = '',
  helpText,
  rows = 4,
  maxLength
}: FormTextAreaProps) {
  const fieldErrors = errors.filter(error => error.field === name)
  const hasError = fieldErrors.length > 0

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
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
      
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        className={`
          block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
          placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          resize-vertical
          ${hasError ? 'border-red-300 ring-red-100' : ''}
        `}
        aria-invalid={hasError}
        aria-describedby={helpText ? `${name}-help` : hasError ? `${name}-error` : undefined}
      />
      
      {maxLength && (
        <div className="flex justify-between text-sm text-gray-500">
          <span>{helpText}</span>
          <span>{value.length}/{maxLength}</span>
        </div>
      )}
      
      {!maxLength && helpText && (
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
