import { Pet } from '../types/Pet';

export const checkFav = (pets: Pet[], favPet: Pet) => {
  return pets[favPet.id].name === favPet.name;
};
