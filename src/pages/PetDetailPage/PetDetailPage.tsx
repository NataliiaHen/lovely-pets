import './PetDetailPage.scss';
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../../components/Container';
import { PetDetails } from '../../components/PetDetails';
import { PetsCarousel } from '../../components/PetsCarousel';
import { Loader } from '../../components/Loader';
import { useGetPetsQuery } from '../../api/apiSlice';
import { Pet } from '../../types/Pet';

export const PetDetailPage: React.FC = memo(() => {
  const { petId } = useParams();
  const { data: petsData, isLoading: petsLoading } = useGetPetsQuery({
    size: 10,
  });
  const pets = petsData ? petsData?.content : ([] as Pet[]);
  const petsCount = petsData?.totalItems || 0;

  return (
    <div className="pet-page">
      {petsLoading && <Loader />}
      <Container>
        <div className="pet-page__content">
          <h2 className="pet-page__title">Meet</h2>

          {petId && <PetDetails key={petId} petId={+petId} />}
        </div>
      </Container>

      {pets.length > 0 && petId && (
        <PetsCarousel pets={pets} petShowId={+petId} petsCount={petsCount} />
      )}
    </div>
  );
});
