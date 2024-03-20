import './FavoritesPage.scss';
import React, { memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/Container';
import { PetsList } from '../../components/PetsList';
import { PetsCarousel } from '../../components/PetsCarousel';
import { NoResults } from '../../components/NoResults';
import { useGetPetsQuery } from '../../api/apiSlice';
import { Pet } from '../../types/Pet';
import { Loader } from '../../components/Loader';
import { FavContext } from '../../storage/FavContext';

export const Favourites: React.FC = memo(() => {
  const { favoritePets, removeAll } = useContext(FavContext);
  const { data: petsData, isLoading: petsLoading } = useGetPetsQuery({
    size: 10,
  });
  const pets = petsData?.content || ([] as Pet[]);
  const petsCount = petsData?.totalItems || 0;

  return (
    <div className="favorites">
      {petsLoading && <Loader />}

      <Container>
        <div className="favorites__content">
          {favoritePets.length > 0 ? (
            <>
              <div className="favorites__top">
                <h1 className="favorites__title">Favorites</h1>

                <p className="favorites__text">
                  {`${favoritePets.length} items`}
                </p>
              </div>

              <button
                type="button"
                className="favorites__button"
                onClick={removeAll}
              >
                Remove all
              </button>

              <PetsList pets={favoritePets} />
            </>
          ) : (
            <NoResults>
              <div className="favorites__error-message">
                <p>
                  Looks like you haven&apos;t added any pets to your favorites
                  yet.
                </p>

                <p>
                  Don&apos;t worry, you can find some adorable companions
                  waiting for you.
                  <br />
                  Simply click the button below to start exploring and adding
                  your favorites!
                </p>
              </div>

              <Link to="/pets" className="favorites__find-link">
                Find Pets
              </Link>
            </NoResults>
          )}
        </div>
      </Container>

      {pets.length && (
        <PetsCarousel
          pets={pets}
          favoritePets={favoritePets}
          petsCount={petsCount}
        />
      )}
    </div>
  );
});
