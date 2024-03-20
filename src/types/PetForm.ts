import { AgeType, AnimalType, GenderType } from './Pet';

export interface Post {
  ownerName: string;
  ownerContactPhone: string;
  name: string;
  age: AgeType;
  animalType: AnimalType;
  gender: GenderType;
  location: string;
  description: string;
}

export interface PetFormData {
  post: Post;
  images: (File | null)[];
}
