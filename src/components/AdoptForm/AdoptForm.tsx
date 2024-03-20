import './AdoptForm.scss';
import React, { Fragment, memo, useCallback, useState } from 'react';
import {
  useForm,
  Controller,
  SubmitHandler,
  ControllerRenderProps,
} from 'react-hook-form';
import { ReactSVG } from 'react-svg';
import { PetFormData } from '../../types/PetForm';
import {
  ageOptions,
  animalTypeOptions,
  genderOptions,
  ukraineRegionsOptions,
} from '../../storage/options';
import CustomSelect from '../Select/Select';
import { ImageUpload } from '../ImageUpload/ImageUpload';
import { appendFormData } from '../../helpers/appendFormData';
import { Loader } from '../Loader';
import { NotificationStatus } from '../../types/Notification';
import { useActions } from '../../app/hooks';
import { useAddNewPetMutation } from '../../api/apiSlice';
import { FormField } from '../FormField/FormField';
import { FormPhoneField } from '../FormPhoneField/FormPhoneField';
import { nameRegEx, phoneRegEx } from '../../storage/patterns';

export const AdoptForm: React.FC = memo(() => {
  const { setNotification } = useActions();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [currentPhotoInput, setCurrentPhotoInput] = useState(0);
  const [addPet] = useAddNewPetMutation();

  const {
    handleSubmit,
    control,
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm<PetFormData>({
    defaultValues: {
      post: {},
      images: [],
    },
    mode: 'onChange',
  });

  const descriptionValue = getValues('post.description');

  const onSubmit: SubmitHandler<PetFormData> = (data: PetFormData) => {
    setIsLoading(true);

    const formData = appendFormData(data);

    addPet(formData)
      .unwrap()
      .then(() => {
        setNotification({
          message: 'We contact you soon',
          color: NotificationStatus.Success,
        });
        setIsSubmitSuccessful(true);

        setTimeout(() => {
          setCurrentPhotoInput(0);
          setIsSubmitSuccessful(false);
          reset();
        }, 200);
      })
      .catch(() => {
        setNotification({
          message: 'Something went wrong! Try later',
          color: NotificationStatus.Error,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePreviewChange = (values: (File | null)[]) => {
    const newInputIndex = values.findIndex(photo => !photo);

    setCurrentPhotoInput(cur => (newInputIndex >= 0 ? newInputIndex : cur + 1));
  };

  const handleImageChange = useCallback(
    (
      file: File | null,
      field: ControllerRenderProps<PetFormData, any>,
      index: number,
    ) => {
      const updatedValues = [...field.value];

      updatedValues[index] = file;
      field.onChange(updatedValues);
      handlePreviewChange(updatedValues);
    },
    [],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="adopt-form">
      {isLoading && <Loader />}

      <h2 className="adopt-form__title">Fill the information</h2>

      <section className="adopt-form__section">
        <p className="adopt-form__section-title">About You</p>

        <div className="adopt-form__section-content">
          <div className="adopt-form__field adopt-form__field--half-block">
            <FormField
              label="Name"
              type="text"
              placeholder="Your name"
              register={register('post.ownerName', {
                required: 'Name is required field!',
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 characters long',
                },
                maxLength: {
                  value: 30,
                  message: 'Name must be less than 30 characters long',
                },
                pattern: {
                  value: nameRegEx,
                  message: 'Invalid characters',
                },
              })}
              error={errors?.post?.ownerName}
            />
          </div>

          <div className="adopt-form__field adopt-form__field--half-block">
            <Controller
              name="post.ownerContactPhone"
              control={control}
              rules={{
                required: 'Phone number is required field!',
                pattern: {
                  value: phoneRegEx,
                  message: 'Please enter valid format +380 XX XXX XXXX',
                },
              }}
              render={({ field }) => (
                <FormPhoneField
                  field={field}
                  control={control}
                  error={errors.post?.ownerContactPhone}
                  placeholder="Phone number"
                  label="Number"
                />
              )}
            />
          </div>
        </div>
      </section>

      <section className="adopt-form__section">
        <p className="adopt-form__section-title">About Pet</p>

        <div className="adopt-form__section-content">
          <div className="adopt-form__field">
            <FormField
              label="Name"
              type="text"
              placeholder="Pet name"
              register={register('post.name', {
                required: 'Pet name is required field!',
                pattern: {
                  value: nameRegEx,
                  message: 'Invalid characters',
                },
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters long',
                },
                maxLength: {
                  value: 30,
                  message: 'Name must be less than 30 characters long',
                },
              })}
              error={errors?.post?.name}
            />
          </div>

          <div className="adopt-form__field">
            <label className="adopt-form__field-label" htmlFor="animal type">
              <div className="adopt-form__icon-box">
                <ReactSVG
                  src="img/icon/paw.svg"
                  className="adopt-form__field-label-icon"
                />
              </div>
              Animal Type
            </label>

            <div className="adopt-form__radio-group" id="animal type">
              {animalTypeOptions.map(option => {
                return (
                  <Fragment key={option.value}>
                    <input
                      type="radio"
                      id={option.label}
                      value={option.value}
                      {...register('post.animalType', {
                        required: 'Animal type is required',
                      })}
                      className="adopt-form__radio-button"
                    />
                    <label
                      htmlFor={option.label}
                      className="adopt-form__radio-label"
                    >
                      {option.label}
                    </label>
                  </Fragment>
                );
              })}
            </div>

            {errors?.post?.animalType && (
              <span className="adopt-form__error">
                {errors?.post?.animalType.message}
              </span>
            )}
          </div>

          <div className="adopt-form__field">
            <label className="adopt-form__field-label" htmlFor="gender">
              <div className="adopt-form__icon-box">
                <ReactSVG
                  src="img/icon/gender.svg"
                  className="adopt-form__field-label-icon"
                />
              </div>
              Gender
            </label>

            <div className="adopt-form__radio-group" id="gender">
              {genderOptions.map(option => (
                <Fragment key={option.value}>
                  <input
                    type="radio"
                    id={option.label}
                    value={option.value}
                    {...register('post.gender', {
                      required: 'Animal gender is required',
                    })}
                    className="adopt-form__radio-button"
                  />

                  <label
                    htmlFor={option.label}
                    className="adopt-form__radio-label"
                  >
                    {option.label}
                  </label>
                </Fragment>
              ))}
            </div>

            {errors?.post?.gender && (
              <span className="adopt-form__error">
                {errors?.post?.gender.message}
              </span>
            )}
          </div>

          <div className="adopt-form__field adopt-form__field--half-block">
            <label className="adopt-form__field-label" htmlFor="Location">
              <div className="adopt-form__icon-box">
                <ReactSVG
                  src="img/icon/location.svg"
                  className="adopt-form__field-label-icon"
                />
              </div>
              Location
            </label>

            <div className="adopt-form__custom-select">
              <Controller
                name="post.location"
                control={control}
                render={({ field }) => (
                  <>
                    <CustomSelect
                      options={ukraineRegionsOptions}
                      field={field}
                      placeholder="Choose region"
                      id="Location"
                    />
                    {errors?.post?.location && (
                      <span className="adopt-form__error">
                        {errors?.post?.location.message}
                      </span>
                    )}
                  </>
                )}
                rules={{ required: 'Location is required' }}
              />
            </div>
          </div>

          <div className="adopt-form__field adopt-form__field--half-block">
            <label className="adopt-form__field-label" htmlFor="age">
              <div className="adopt-form__icon-box">
                <ReactSVG
                  src="img/icon/calendar.svg"
                  className="adopt-form__field-label-icon"
                />
              </div>
              Age
            </label>

            <div className="adopt-form__custom-select">
              <Controller
                name="post.age"
                control={control}
                render={({ field }) => (
                  <>
                    <CustomSelect
                      options={ageOptions}
                      field={field}
                      placeholder="Choose age"
                      id="age"
                    />
                  </>
                )}
                rules={{ required: 'Age is required' }}
              />
            </div>

            {errors?.post?.age && (
              <span className="adopt-form__error">
                {errors?.post?.age.message}
              </span>
            )}
          </div>

          <div className="adopt-form__field">
            <FormField
              label="Description"
              type="textarea"
              placeholder="Briefly describe the pet"
              register={register('post.description', {
                required: 'Please type at least 10 characters.',
                minLength: {
                  value: 10,
                  message: 'Please type at least 10 characters.',
                },
                maxLength: {
                  value: 300,
                  message: 'Please type less than 300 characters.',
                },
              })}
              error={errors?.post?.description}
              characterCount={descriptionValue?.length}
              maxCharacters={300}
            />
          </div>

          <div className="adopt-form__field">
            <label className="adopt-form__field-label" htmlFor="description">
              Photos:
            </label>

            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <div className="adopt-form__photo-container">
                  {[1, 2, 3, 4].map((num, index) => (
                    <ImageUpload
                      key={num}
                      onChange={(file: File | null) =>
                        handleImageChange(file, field, index)
                      }
                      currentInput={currentPhotoInput === index}
                      clearPreview={isSubmitSuccessful}
                    />
                  ))}
                </div>
              )}
              rules={{ required: 'At least one photo is required' }}
            />

            {errors.images && (
              <span className="adopt-form__error">
                {errors.images?.message}
              </span>
            )}
          </div>
        </div>
      </section>

      <button type="submit" className="adopt-form__button">
        Send
      </button>
    </form>
  );
});

AdoptForm.displayName = 'AdoptForm';
