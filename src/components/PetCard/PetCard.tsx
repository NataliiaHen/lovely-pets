import './PetCard.scss';
import { Link, useLocation } from 'react-router-dom';
import React, { memo } from 'react';
import { ReactSVG } from 'react-svg';
import { ButtonHeart } from '../ButtonHeart';
import { AdoptBtn } from '../AdoptBtn';
import { Pet } from '../../types/Pet';
import { convertToTitleCase } from '../../helpers/getTitileCase';

type Props = {
  pet: Pet;
};

export const PetCard: React.FC<Props> = memo(({ pet }) => {
  const { id, name, gender, age, postImages } = pet;
  const state = useLocation();
  const imageUrl = `data:image/png;base64,${postImages[0].data}`;

  return (
    <li className="pet-card">
      <Link to={`/pets/${id}`} state={{ search: state.search }}>
        <div className="pet-card__img-container">
          <div className="pet-card__link-img">
            <img src={imageUrl} alt={name} className="pet-card__img" />
          </div>

          <div className="pet-card__fav-btn">
            <ButtonHeart key={pet.id} pet={pet} />
          </div>
        </div>

        <div className="pet-card__detail">
          <p className="pet-card__name">{name}</p>

          <div className="pet-card__info-block">
            <div className="pet-card__info">
              <div className="pet-card__icon-box">
                <ReactSVG
                  src={`img/icon/${gender.toLowerCase()}.svg`}
                  className="pet-card__icon"
                />
              </div>

              <div className="pet-card__info-text">
                {convertToTitleCase(gender)}
              </div>
            </div>

            <div className="pet-card__info">
              <div className="pet-card__icon-box">
                <ReactSVG
                  src="img/icon/calendar.svg"
                  className="pet-card__icon"
                />
              </div>

              <div className="pet-card__info-text">{`${age} years`}</div>
            </div>
          </div>

          <div className="pet-card__buttons">
            <AdoptBtn id={pet.id}>Adopt</AdoptBtn>
          </div>
        </div>
      </Link>
    </li>
  );
});
