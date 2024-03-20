import { SelectOption } from '../types/SelectOptions';
import { getOptions } from '../helpers/getOptions';

export const ukraineRegions = [
  'Kyivska Oblast',
  'Kharkivska Oblast',
  'Lvivska Oblast',
  'Dnipropetrovska Oblast',
  'Odeska Oblast',
  'Donetska Oblast',
  'Zaporizka Oblast',
  'Ivano-Frankivska Oblast',
  'Zhytomyrska Oblast',
  'Khmelnytska Oblast',
  'Chernivetska Oblast',
  'Mykolaivska Oblast',
  'Vinnytska Oblast',
  'Ternopilska Oblast',
  'Cherkaska Oblast',
  'Sumska Oblast',
  'Rivnenska Oblast',
  'Chernihivska Oblast',
  'Zakarpatska Oblast',
  'Volynska Oblast',
  'Kirovohradska Oblast',
  'Poltavska Oblast',
  'Khersonska Oblast',
  'Luhanska Oblast',
];

export const ukraineRegionsOptions: SelectOption[] = getOptions(ukraineRegions);

export const ageOptions: readonly SelectOption[] = [
  { value: '0-1', label: '0-1 years' },
  { value: '1-2', label: '1-2 years' },
  { value: '2-5', label: '2-5 years' },
  { value: '5+', label: '5+ years' },
];

export const animalTypeOptions: readonly SelectOption[] = [
  { value: 'CAT', label: 'Cat' },
  { value: 'DOG', label: 'Dog' },
];

export const genderOptions: readonly SelectOption[] = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
];
