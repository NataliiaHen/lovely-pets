import './FormField.scss';
import React from 'react';
import { FieldError } from 'react-hook-form';
import classNames from 'classnames';
import { RegisterInputType } from '../../types/FormField';

interface FormFieldProps {
  label: string;
  type: 'text' | 'textarea';
  placeholder: string;
  error?: FieldError | undefined;
  register: RegisterInputType;
  characterCount?: number;
  maxCharacters?: number;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  placeholder,
  error,
  register,
  characterCount = 0,
  maxCharacters,
}) => {
  const isLengthError =
    type === 'textarea' &&
    !error &&
    characterCount > 0 &&
    maxCharacters &&
    characterCount > maxCharacters;

  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={label.toLowerCase()}>
        {label}
      </label>

      {type === 'textarea' ? (
        <textarea
          {...register}
          className={classNames(
            'form-field__input form-field__input--textarea',
            {
              'form-field__input--error': error,
            },
          )}
          placeholder={placeholder}
        />
      ) : (
        <input
          {...register}
          type={type}
          className={classNames('form-field__input', {
            'form-field__input--error': error,
          })}
          placeholder={placeholder}
        />
      )}

      {error && <span className="form-field__error">{error.message}</span>}

      {isLengthError && (
        <p className="form-field__error form-field__error--right">
          {`${characterCount}/${maxCharacters}`}
        </p>
      )}
    </div>
  );
};
