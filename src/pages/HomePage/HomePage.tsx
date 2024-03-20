import React from 'react';
import './HomePage.scss';
import { Baner } from '../../components/Baner';
import { Services } from '../../components/Services';
import { GivePet } from '../../components/GivePet';
import { QuestionForm } from '../../components/QuestionForm';
import { PetsCarousel } from '../../components/PetsCarousel';
import { Loader } from '../../components/Loader';
import { useGetPetsQuery } from '../../api/apiSlice';
import { Pet } from '../../types/Pet';

export const HomePage: React.FC = () => {
  const { data: petsData, isLoading: petsLoading } = useGetPetsQuery({
    size: 12,
  });
  const pets = petsData?.content || ([] as Pet[]);
  const petsCount = petsData?.totalItems || 0;

  return (
    <div className="home-page">
      <Baner />
      <Services />
      <GivePet />
      {pets.length > 0 && <PetsCarousel pets={pets} petsCount={petsCount} />}
      <QuestionForm key="home-page" />
      {petsLoading && <Loader />}
    </div>
  );
};
