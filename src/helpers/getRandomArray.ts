import { Pet } from '../types/Pet';

export const getRandomArray = (
  arr: Pet[],
  length: number,
  favoritePets?: Pet[],
  petShowId?: number,
) => {
  const shuffled = [...arr]
    .filter(pet => {
      if (petShowId) {
        return pet.id !== petShowId;
      }

      if (favoritePets) {
        return !favoritePets.some(fav => fav.id === pet.id);
      }

      return true;
    })
    .sort(() => 0.5 - Math.random());
  const limit = arr.length < length ? arr.length : length;

  return shuffled.slice(0, limit);
};
