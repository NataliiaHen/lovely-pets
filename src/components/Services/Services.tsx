import React from 'react';
import { Link } from 'react-router-dom';
import './Services.scss';
import { Container } from '../Container';

export const Services: React.FC = () => {
  return (
    <div className="services page__section">
      <Container>
        <div className="services__content">
          <h2 className="services__title">What can you do on our service?</h2>

          <div className="services__links">
            <Link to="/pets?animalType=CAT" className="services__link">
              <div className="services__photo-container">
                <img src="img/cat.png" alt="cat" className="services__photo" />
              </div>

              <p className="services__type">Choose a cat</p>
            </Link>
            <Link to="/pets?animalType=DOG" className="services__link">
              <div className="services__photo-container">
                <img src="img/dog.png" alt="dog" className="services__photo" />
              </div>

              <p className="services__type">Choose a dog</p>
            </Link>

            <Link to="/give-for-adoption" className="services__link">
              <div className="services__photo-container">
                <img
                  src="img/healthcare.png"
                  alt="healthcare"
                  className="services__photo"
                />
              </div>

              <p className="services__type">Give for adoption</p>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
