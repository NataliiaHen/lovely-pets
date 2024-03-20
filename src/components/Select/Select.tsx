import React, { useState, memo, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import Select, {
  components,
  DropdownIndicatorProps,
  OptionProps,
  StylesConfig,
} from 'react-select';
import './Select.scss';
import { SelectOption } from '../../types/SelectOptions';

const getValue = (fieldValue: string, options: readonly SelectOption[]) => {
  if (fieldValue) {
    return options.find(option => option.value === fieldValue);
  }

  return undefined;
};

type Props = {
  options: readonly SelectOption[];
  placeholder: string;
  field: any;
  isMulti?: boolean;
  id: string;
};

const CustomSelect: React.FC<Props> = memo(
  ({ options, field, placeholder, id, isMulti = false }) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(
      getValue(field?.value, options),
    );

    const CustomOption = (props: OptionProps<SelectOption, true>) => {
      return (
        <components.Option {...props}>
          <input
            type="checkbox"
            readOnly
            checked={field.value === props.data.value}
            style={{ marginRight: '8px' }}
          />
          {props.children}
        </components.Option>
      );
    };

    const CustomDropdownIndicator = (
      props: DropdownIndicatorProps<SelectOption, true>,
    ) => {
      return (
        <components.DropdownIndicator {...props}>
          <ReactSVG
            src={
              menuIsOpen ? 'img/icon/arrow-up.svg' : 'img/icon/arrow-down.svg'
            }
          />
        </components.DropdownIndicator>
      );
    };

    const customStyles: StylesConfig<SelectOption> = {
      control: (provided, state) => ({
        ...provided,
        borderRadius: '6px',
        height: '100%',
        backgroundColor: 'inherit',
        cursor: 'pointer',
        border: '1px solid #D1D1D2',
        borderColor: state.isFocused ? '#90B5FF' : '#D1D1D2',
        ':hover': {
          borderColor: '#0E5FFF',
        },
      }),
      indicatorSeparator: () => ({
        display: 'none',
      }),
      menu: provided => ({
        ...provided,
        position: 'absolute',
        top: '100%',
        left: '0',
        zIndex: 1,
        border: '1px solid #90B5FF',
        borderRadius: '6px',
        overflowY: 'auto',
        fontSize: '18px',
      }),
      option: (provided, state) => ({
        ...provided,
        padding: '8px',
        color: state.isSelected ? '#0A43B5' : '#454545',
        backgroundColor: state.isSelected ? '#FDFDFD' : '#FDFDFD',
        cursor: 'pointer',
        ':hover': {
          backgroundColor: '#f1f1f1',
          color: '#3E7FFF',
        },
      }),
      indicatorsContainer: provided => ({
        ...provided,
        pointerEvents: 'none',
      }),
      placeholder: provided => ({
        ...provided,
        color: '#7F7F7F;',
      }),
    };

    useEffect(() => {
      const newInternalValue = getValue(field?.value, options);

      setInternalValue(newInternalValue);
    }, [field?.value, options]);

    return (
      <div className="custom-dropdown">
        <Select
          {...field}
          classNamePrefix="custom-select"
          className="custom-select-container"
          options={options}
          value={internalValue || null}
          placeholder={placeholder}
          isSearchable
          autoFocus={false}
          isMulti={isMulti}
          onMenuOpen={() => setMenuIsOpen(true)}
          onMenuClose={() => setMenuIsOpen(false)}
          components={{
            IndicatorSeparator: () => null,
            Option: CustomOption,
            DropdownIndicator: CustomDropdownIndicator,
          }}
          onChange={(selectedOption: SelectOption) => {
            field.onChange(selectedOption.value);
          }}
          styles={customStyles}
          id={id}
        />
      </div>
    );
  },
);

export default CustomSelect;
