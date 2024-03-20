import { Pet } from '../../types/Pet';

export const checkFav = (favPets: Pet[], id: number) => {
  if (favPets.length) {
    return favPets.some(currentPet => currentPet.id === id) || false;
  }

  return false;
};
