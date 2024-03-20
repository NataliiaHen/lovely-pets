import './PetsList.scss';
import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { PetCard } from '../PetCard';
import { Pet } from '../../types/Pet';

type Props = {
  pets: Pet[];
};

export const PetsList: React.FC<Props> = memo(({ pets }) => {
  const { pathname } = useLocation();

  return (
    <div className="pets-list__box">
      <ul
        className={classNames('pets-list', {
          'pets-list--favorites': pathname === '/favorites',
        })}
      >
        {pets.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </ul>
    </div>
  );
});
