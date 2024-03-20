import React, { memo, useEffect } from 'react';
import './Filters.scss';
import { ReactSVG } from 'react-svg';
import { useSearchParams } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
  ageOptions,
  animalTypeOptions,
  genderOptions,
} from '../../storage/options';
import { FiltersType } from '../../types/Filters';
import CustomSelect from '../Select/Select';
import { getSearchWith } from '../../helpers/searchHelpers';
import { getAvailableRegion } from './utils';
import { useGetPetsQuery } from '../../api/apiSlice';

type Props = {
  closeMenu?: () => void;
};

export const Filters: React.FC<Props> = memo(({ closeMenu }) => {
  const { data: petsData } = useGetPetsQuery();
  const pets = petsData?.content;
  const [searchParams, setSearchParams] = useSearchParams();
  const age = searchParams.get('age') || '';
  const gender = searchParams.get('gender') || '';
  const location = searchParams.get('location') || '';
  const animalType = searchParams.get('animalType') || '';
  const filterRegions = pets ? getAvailableRegion(pets) : [];

  const { handleSubmit, control, register, reset, setValue } =
    useForm<FiltersType>({
      defaultValues: {
        age,
        animalType,
        location,
        gender,
      },
    });

  const onSubmit: SubmitHandler<FiltersType> = (data: FiltersType) => {
    const params = getSearchWith(searchParams, { ...data, page: '0' });

    setSearchParams(params);

    if (closeMenu) {
      closeMenu();
    }
  };

  const handleReset = () => {
    const params = getSearchWith(searchParams, {
      age: null,
      animalType: null,
      location: null,
      gender: null,
    });

    reset();

    if (closeMenu) {
      closeMenu();
    }

    setSearchParams(params);
  };

  const updateFormValuesFromSearchParams = () => {
    setValue('age', age);
    setValue('gender', gender);
    setValue('location', location);
    setValue('animalType', animalType);
  };

  useEffect(() => {
    updateFormValuesFromSearchParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="filters">
      <form className="filters__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="filters__field">
          <div className="filters__type">
            <div className="filters__icon-box">
              <ReactSVG src="img/icon/paw.svg" className="filters__type-icon" />
            </div>
            Animal type
          </div>

          <div className="filters__options">
            <div className="filters__radio-button">
              <input
                type="radio"
                id="all-type"
                value=""
                defaultChecked={animalType === ''}
                {...register('animalType')}
                className="filters__radio-button"
              />
              <label htmlFor="all-type" className="filters__custom-radio-label">
                <span className="filters__custom-radio" />
                All
              </label>
            </div>

            {animalTypeOptions.map(option => (
              <div key={option.value} className="filters__radio-button">
                <input
                  type="radio"
                  id={option.label}
                  value={option.value}
                  {...register('animalType')}
                  className="filters__radio-button"
                />
                <label
                  htmlFor={option.label}
                  className="filters__custom-radio-label"
                >
                  <span className="filters__custom-radio" />

                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="filters__field">
          <div className="filters__type">
            <div className="filters__icon-box">
              <ReactSVG
                src="img/icon/gender.svg"
                className="filters__type-icon"
              />
            </div>
            Gender
          </div>

          <div className="filters__options">
            <div className="filters__radio-button">
              <input
                type="radio"
                id="all-gender"
                value=""
                defaultChecked={gender === ''}
                {...register('gender')}
                className="filters__radio-button"
              />
              <label
                htmlFor="all-gender"
                className="filters__custom-radio-label"
              >
                <span className="filters__custom-radio" />
                All
              </label>
            </div>

            {genderOptions.map(option => (
              <div key={option.value} className="filters__radio-button">
                <input
                  type="radio"
                  id={option.label}
                  value={option.value}
                  {...register('gender')}
                  className="filters__radio-button"
                />
                <label
                  htmlFor={option.label}
                  className="filters__custom-radio-label"
                >
                  <span className="filters__custom-radio" />

                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="filters__field">
          <div className="filters__type">
            <div className="filters__icon-box">
              <ReactSVG
                src="img/icon/calendar.svg"
                className="filters__type-icon"
              />
            </div>
            Age
          </div>

          <div className="filters__options">
            <div className="filters__radio-button">
              <input
                type="radio"
                id="all-ages"
                value=""
                defaultChecked={age === ''}
                {...register('age')}
                className="filters__radio-button"
              />
              <label htmlFor="all-ages" className="filters__custom-radio-label">
                <span className="filters__custom-radio" />
                All
              </label>
            </div>

            {ageOptions.map(option => (
              <div className="filters__radio-button" key={option.value}>
                <input
                  type="radio"
                  id={option.value}
                  value={option.value}
                  {...register('age')}
                  className="filters__radio-button"
                />
                <label
                  htmlFor={option.value}
                  className="filters__custom-radio-label"
                >
                  <span className="filters__custom-radio" />

                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="filters__field">
          <div className="filters__type">
            <div className="filters__icon-box">
              <ReactSVG
                src="img/icon/location.svg"
                className="filters__type-icon"
              />
            </div>
            Location
          </div>

          <div className="filters__location-select">
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  id="location"
                  options={filterRegions}
                  field={field}
                  placeholder="All regions"
                />
              )}
            />
          </div>
        </div>

        <div className="filters__buttons">
          <button type="submit" className="filters__button">
            Apply
          </button>

          <button
            type="button"
            className="filters__button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
});
