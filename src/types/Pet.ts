export type AnimalType = 'CAT' | 'DOG';
export type GenderType = 'MALE' | 'FEMALE';
export type AgeType = '0-1' | '1-2' | '2-5' | '5+';

export interface Pet {
  id: number;
  ownerName: string;
  ownerContactPhone: string;
  name: string;
  age: AgeType;
  animalType: AnimalType;
  gender: GenderType;
  location: string;
  description: string;
  postImages: [
    {
      data: string;
    },
  ];
}

export interface PetsData {
  content: Pet[];
  totalItems: number;
}

export interface Filters {
  age: AgeType;
  animalType: AnimalType;
  gender: GenderType;
  location: string;
}
