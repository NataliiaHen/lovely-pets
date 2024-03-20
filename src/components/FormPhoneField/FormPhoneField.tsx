import './FormPhoneField.scss';
import classNames from 'classnames';
import React from 'react';
import { Control, FieldError } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input/react-hook-form-input';
import { ControlledFieldType } from '../../types/FormField';

type Props = {
  field: ControlledFieldType;
  control: Control<any>;
  error?: FieldError | undefined;
  label: string;
  placeholder: string;
};

export const FormPhoneField: React.FC<Props> = ({
  label,
  placeholder,
  field,
  error,
  control,
}) => {
  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={label.toLowerCase()}>
        {label}
      </label>

      <PhoneInput
        {...field}
        control={control}
        country="UA"
        defaultCountry="UA"
        international
        withCountryCallingCode
        useNationalFormatForDefaultCountryValue
        placeholder={placeholder}
        className={classNames('form-field__input', {
          'form-field__input--error': error,
        })}
        id={label.toLowerCase()}
      />

      {error && <p className="form-field__error">{error.message}</p>}
    </div>
  );
};
