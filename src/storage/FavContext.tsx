/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react';
import { Pet } from '../types/Pet';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useActions } from '../app/hooks';
import { NotificationStatus } from '../types/Notification';
import { useGetPetsQuery } from '../api/apiSlice';

export type Context = {
  favoritePets: Pet[];
  addFav: (Pet: Pet) => void;
  removeFav: (id: number) => void;
  removeAll: () => void;
};

export const FavContext = React.createContext<Context>({
  favoritePets: [],
  addFav: () => {},
  removeFav: () => {},
  removeAll: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FavProvider: React.FC<Props> = ({ children }) => {
  const { data: petsData, isLoading } = useGetPetsQuery();
  const pets = petsData ? petsData.content : ([] as Pet[]);
  const [favoritePets, setFavoritePets] = useLocalStorage<Pet[]>(
    'favoritePets',
    [],
  );
  const { setNotification } = useActions();

  const addFav = (pet: Pet) => {
    setFavoritePets([...favoritePets, pet]);

    setNotification({
      message: 'Added to favorites',
      color: NotificationStatus.Success,
    });
  };

  const removeFav = (id: number) => {
    setFavoritePets(favoritePets.filter(curProd => curProd.id !== id));

    setNotification({
      message: 'Deleted from favorites',
      color: NotificationStatus.Error,
    });
  };

  const removeAll = () => {
    setFavoritePets([]);
  };

  const value = useMemo(
    () => ({
      favoritePets,
      addFav,
      removeFav,
      removeAll,
    }),
    [favoritePets],
  );

  useEffect(() => {
    const checkedFav = favoritePets.filter((favPet: Pet) =>
      pets.some(pet => pet.id === favPet.id && pet.name === favPet.name),
    );

    if (!isLoading) {
      setFavoritePets(checkedFav);
    }
  }, [isLoading]);

  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
};
