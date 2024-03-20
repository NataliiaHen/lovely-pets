import './GivePet.scss';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../Container';

export const GivePet: React.FC = memo(() => {
  return (
    <div className="give-pet">
      <Container>
        <div className="give-pet__content">
          <div className="give-pet__photo-container">
            <div className="give-pet__decor-circle"></div>

            <img
              className="give-pet__img"
              src="img/give-pet.png"
              alt="Woman with dog"
            />
          </div>
          <div className="give-pet__info">
            <h2 className="give-pet__title">Give an animal for adoption</h2>

            <p className="give-pet__text">
              Share your kindness and love by posting an ad for an animal on our
              service. Together we create hope and opportunity for every
              homeless soul to find a happy home. Your step is the path to a new
              beginning for these animals, where they will receive safety and
              boundless love.
              <br />
              <br />
              Join our community and give a second chance for a happy future!
            </p>

            <Link to="/give-for-adoption" className="give-pet__link">
              Submit an application
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
});
