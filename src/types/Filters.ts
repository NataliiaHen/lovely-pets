// import { AgeType, AnimalType, GenderType } from './Pet';

// export type FiltersType = {
//   age: AgeType | AgeType[] | '';
//   animalType: AnimalType | '';
//   gender: GenderType | '';
//   location: string;
//   [key: string]: string | string[];
// };

export type FiltersType = {
  age: string;
  animalType: string;
  gender: string;
  location: string;
  [key: string]: string;
};
