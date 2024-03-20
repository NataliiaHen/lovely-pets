import './PetsCarousel.scss';
import React, { memo, useContext, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CardSwiper } from '../Swiper';
import { Pet } from '../../types/Pet';
import { Container } from '../Container';
import { getRandomArray } from '../../helpers/getRandomArray';
import { Loader } from '../Loader';
import { PetsList } from '../PetsList';
import { PageSizeContext } from '../../storage/PageSizeContext';

type Props = {
  pets: Pet[];
  favoritePets?: Pet[];
  petShowId?: number;
  petsCount: number;
};

export const PetsCarousel: React.FC<Props> = memo(
  ({ pets, favoritePets, petShowId }) => {
    const { isMobile, isTablet } = useContext(PageSizeContext);
    const { pathname } = useLocation();
    const arrLength = isMobile || isTablet ? 4 : 12;
    const randomPets = useMemo(
      () => pets && getRandomArray(pets, arrLength, favoritePets, petShowId),
      [pets, arrLength, favoritePets, petShowId],
    );

    if (!randomPets) {
      return <Loader />;
    }

    return (
      <div className="pets-carousel">
        <Container>
          <div className="pets-carousel__top">
            {pathname === '/' ? (
              <>
                <h2 className="pets-carousel__title">Pick a friend</h2>

                <p className="pets-carousel__count">
                  {`${pets.length} available`}
                </p>
              </>
            ) : (
              <h2 className="pets-carousel__title">
                They are also looking for homes
              </h2>
            )}
          </div>
        </Container>

        {pets.length > 0 && randomPets.length > 0 && (
          <>
            {isMobile || isTablet ? (
              <Container>
                <div className="pets-carousel__list">
                  <PetsList pets={randomPets} />
                  <Link to="/pets" className="pets-carousel__view-all">
                    View all
                  </Link>
                </div>
              </Container>
            ) : (
              <CardSwiper pets={randomPets} />
            )}
          </>
        )}
      </div>
    );
  },
);
