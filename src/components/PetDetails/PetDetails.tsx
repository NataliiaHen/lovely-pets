import './PetDetails.scss';
import classNames from 'classnames';
import React, { Fragment, memo, useCallback, useState } from 'react';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { AdoptBtn } from '../AdoptBtn';
import { ButtonHeart } from '../ButtonHeart';
import { Loader } from '../Loader';
import { generateUniqueRandomKey } from './utils';
import { convertToTitleCase } from '../../helpers/getTitileCase';
import { useGetPetQuery } from '../../api/apiSlice';
import { ButtonMove } from '../ButtonMove';
import { ImageComponent } from '../ImageComponent';
import { NoResults } from '../NoResults';

type Props = {
  petId: number;
};

export const PetDetails: React.FC<Props> = memo(({ petId }) => {
  const [selectedImg, setSelectedImg] = useState(0);
  const { data: pet, isError, isLoading } = useGetPetQuery(petId);

  const nextImg = useCallback(() => {
    if (pet) {
      setSelectedImg(prevSelectedImg => {
        return prevSelectedImg === pet.postImages.length - 1
          ? 0
          : prevSelectedImg + 1;
      });
    }
  }, [pet]);

  const prevImg = useCallback(() => {
    if (pet) {
      setSelectedImg(prevSelectedImg =>
        prevSelectedImg === 0 ? pet.postImages.length - 1 : prevSelectedImg - 1,
      );
    }
  }, [pet]);

  return (
    <div className="pet-details">
      {isLoading && <Loader />}

      {isError && (
        <NoResults>
          <p>There is no such pet.</p>
        </NoResults>
      )}

      <section className="pet-details__section">
        {pet && (
          <div className="pet-details__grid">
            <div className="pet-details__photos">
              <div className="pet-details__big-photo-container">
                {pet?.postImages.length > 1 && (
                  <div className="pet-details__photo-slide-btns">
                    <ButtonMove
                      direction="left"
                      onClick={prevImg}
                      disabled={selectedImg === 0}
                    />

                    <ButtonMove
                      direction="right"
                      onClick={nextImg}
                      disabled={selectedImg === pet.postImages.length - 1}
                    />
                  </div>
                )}

                <ImageComponent
                  base64Image={pet?.postImages[selectedImg].data}
                  altText="Animal selected photo"
                />
              </div>

              <div className="pet-details__small-photos">
                {pet?.postImages.map((photo, index) => {
                  const key = generateUniqueRandomKey();

                  return (
                    <Fragment key={key}>
                      {selectedImg !== index && (
                        <div
                          className={classNames(
                            'pet-details__small-photo-container',
                            {
                              'pet-details__small-photo-container--selected':
                                selectedImg === index,
                            },
                          )}
                          onClick={() => setSelectedImg(index)}
                          aria-hidden
                        >
                          <ImageComponent
                            altText="small photo"
                            base64Image={photo.data}
                          />
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </div>

            <div className="pet-details__info">
              <h2 className="pet-details__name">{pet.name}</h2>

              <ul className="pet-details__info-list">
                <li className="pet-details__item">
                  <h3 className="pet-details__item-title">Age:</h3>
                  <p className="pet-details__item-text">{`${pet.age} years`}</p>
                </li>

                <li className="pet-details__item">
                  <h3 className="pet-details__item-title">Type:</h3>
                  <p className="pet-details__item-text">
                    {convertToTitleCase(pet.animalType)}
                  </p>
                </li>

                <li className="pet-details__item">
                  <h3 className="pet-details__item-title">Gender:</h3>
                  <p className="pet-details__item-text">
                    {convertToTitleCase(pet.gender)}
                  </p>
                </li>

                <li className="pet-details__item">
                  <h3 className="pet-details__item-title">Contact details:</h3>
                  <p className="pet-details__item-text">
                    {formatPhoneNumberIntl(pet.ownerContactPhone)}
                  </p>
                </li>

                <li className="pet-details__item pet-details__item--big">
                  <h3 className="pet-details__item-title">Description:</h3>
                  <p className="pet-details__item-text">{pet.description}</p>
                </li>
              </ul>

              <div className="pet-details__buttons">
                <AdoptBtn id={pet.id}>Adopt</AdoptBtn>

                <ButtonHeart pet={pet} />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
});
