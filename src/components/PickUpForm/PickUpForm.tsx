import './PickUpForm.scss';
import React, { memo } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { PickUpFormFields } from '../../types/PickUpForm';
import { useActions } from '../../app/hooks';
import { NotificationStatus } from '../../types/Notification';
import { usePickUpRequestMutation } from '../../api/apiSlice';
import { FormField } from '../FormField';
import { FormPhoneField } from '../FormPhoneField/FormPhoneField';
import { nameRegEx, phoneRegEx } from '../../storage/patterns';

type Props = {
  id: string;
  handleFormClose: () => void;
};

export const PickUpForm: React.FC<Props> = memo(({ id, handleFormClose }) => {
  const { setNotification } = useActions();
  const [pickUpRequest] = usePickUpRequestMutation();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm<PickUpFormFields>({
    defaultValues: {
      id,
    },
    mode: 'onChange',
  });
  const message = watch('message');

  const onSubmit: SubmitHandler<PickUpFormFields> = (
    data: PickUpFormFields,
  ) => {
    pickUpRequest(data)
      .unwrap()
      .then(() => {
        setNotification({
          message: 'We contact you soon',
          color: NotificationStatus.Success,
        });

        reset();
      })
      .catch(() => {
        setNotification({
          message: 'Something went wrong. Try later',
          color: NotificationStatus.Error,
        });
      })
      .finally(() => {
        handleFormClose();
      });
  };

  return (
    <div className="pick-up">
      <form className="pick-up__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="pick-up__fields">
          <div className="pick-up__field pick-up__field--small">
            <FormField
              label="Name"
              type="text"
              placeholder="Your name"
              error={errors?.name}
              register={register('name', {
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
            />
          </div>

          <div className="pick-up__field pick-up__field--small">
            <Controller
              name="contactPhone"
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
                  error={errors.contactPhone}
                  placeholder="+380669678911"
                  label="Your number"
                />
              )}
            />
          </div>

          <div className="pick-up__field pick-up__field--big">
            <FormField
              label="Your comment"
              type="textarea"
              placeholder="Text"
              error={errors?.message}
              register={register('message', {
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
              characterCount={message?.length}
              maxCharacters={300}
            />
          </div>
        </div>

        <button type="submit" className="pick-up__button">
          Send
        </button>
      </form>
    </div>
  );
});
