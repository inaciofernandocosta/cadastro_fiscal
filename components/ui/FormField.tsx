import React from 'react';

interface FormFieldProps {
  label: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  size?: 'sm' | 'md';
  textAlign?: 'left' | 'center';
  id?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  defaultValue,
  value,
  onChange,
  onKeyDown,
  type = 'text',
  placeholder,
  readOnly,
  disabled,
  className = '',
  inputClassName = '',
  size = 'md',
  textAlign = 'left',
  id,
}) => {
  const fieldId = id || label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const labelSize = size === 'sm' ? 'text-[9px]' : 'text-[10px]';
  const inputSize = size === 'sm' ? 'px-2 py-1.5 text-xs' : 'px-3 py-2 text-sm';
  const textAlignClass = textAlign === 'center' ? 'text-center' : '';

  return (
    <div className={className}>
      <label
        htmlFor={fieldId}
        className={`block ${labelSize} font-bold text-label-light dark:text-label-dark uppercase mb-1 tracking-wide`}
      >
        {label}
      </label>
      <input
        id={fieldId}
        type={type}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        className={`
          w-full
          bg-input-light dark:bg-input-dark
          border border-border-light dark:border-border-dark
          rounded-lg ${inputSize} ${textAlignClass}
          text-text-light dark:text-text-dark
          placeholder-label-light/60 dark:placeholder-label-dark/60
          focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/60
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-150
          ${inputClassName}
        `}
      />
    </div>
  );
};

export default FormField;
