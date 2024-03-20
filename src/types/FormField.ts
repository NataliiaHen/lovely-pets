import { ControllerRenderProps, UseFormRegisterReturn } from 'react-hook-form';
import { PetFormData, Post } from './PetForm';
import { PickUpFormFields } from './PickUpForm';
import { ContactForm } from './ContactForm';

export type ControlledFieldType =
  | ControllerRenderProps<PickUpFormFields, keyof PickUpFormFields>
  | ControllerRenderProps<PetFormData, `post.${keyof Post}`>
  | ControllerRenderProps<ContactForm, keyof ContactForm>;

export type RegisterInputType =
  | UseFormRegisterReturn<`post.${keyof Post}`>
  | UseFormRegisterReturn<keyof ContactForm>
  | UseFormRegisterReturn<keyof PickUpFormFields>;
