import { Pet } from '../../types/Pet';
import { getOptions } from '../../helpers/getOptions';

export const getAvailableRegion = (pets: Pet[]) => {
  const regions: string[] = [];

  pets.forEach(pet => {
    if (!regions.includes(pet.location)) {
      regions.push(pet.location);
    }
  });

  const regionOptions = getOptions(regions);

  return regionOptions;
};
