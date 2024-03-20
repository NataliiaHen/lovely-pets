import React, { memo, useContext } from 'react';
import classNames from 'classnames';
import './ButtonHeart.scss';
import { ReactSVG } from 'react-svg';
import { Pet } from '../../types/Pet';
import { checkFav } from './utils';
import { FavContext } from '../../storage/FavContext';

type Props = {
  pet: Pet;
};

export const ButtonHeart: React.FC<Props> = memo(({ pet }) => {
  const { favoritePets, addFav, removeFav } = useContext(FavContext);
  const isFav = checkFav(favoritePets, pet.id);

  const toggleFav = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!isFav) {
      addFav(pet);
    } else {
      removeFav(pet.id);
    }
  };

  return (
    <button
      className={classNames('button-fav', { 'button-fav--selected': isFav })}
      onClick={e => toggleFav(e)}
      data-cy="addToFavorite"
      aria-label="toggle favorite"
      type="button"
    >
      <ReactSVG src="img/icon/empty-heart.svg" className="pet-card__icon" />
    </button>
  );
});

ButtonHeart.displayName = 'ButtonHeart';
