import React, { memo } from 'react';
import './ContactUsPage.scss';
import { Container } from '../../components/Container';
import { QuestionForm } from '../../components/QuestionForm';

export const ContactUsPage: React.FC = memo(() => {
  return (
    <div className="contact-us">
      <div className="contact-us__content">
        <h2 className="contact-us__main-title">Our contacts</h2>

        <Container>
          <ul className="contact-us__list">
            <li className="contact-us__info contact-us__info--visit">
              <p className="contact-us__title">Visit us</p>
              <a
                href="https://maps.app.goo.gl/VhAycvH7Cek52o5a6"
                target="_blank"
                rel="noreferrer"
                className="contact-us__link"
              >
                Lviv city, Frankivsk district, Naukova Street 32,
                <br />
                Organization for homeless animals &quot;Pets Home&quot;
              </a>
            </li>

            <li className="contact-us__info contact-us__info--call">
              <p className="contact-us__title">Call us</p>
              <a href="tel:+380669718922" className="contact-us__link">
                +38 066 971 89 22
              </a>
            </li>

            <li className="contact-us__info contact-us__info--write">
              <p className="contact-us__title">Write email</p>
              <a
                href="mailto:petshome.contactus@gmail.com"
                className="contact-us__link"
              >
                petshome.contactus@gmail.com
              </a>
            </li>
          </ul>
        </Container>

        <QuestionForm key="contact-us-page" />
      </div>
    </div>
  );
});
