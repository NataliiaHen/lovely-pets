import React, { memo } from 'react';
import { Logo } from '../Logo';
import './Footer.scss';
import { Container } from '../Container';
import { NavList } from '../NavList';

export const Footer: React.FC = memo(() => (
  <footer className="footer">
    <Container>
      <div className="footer__content">
        <div className="footer__item footer__item--logo">
          <Logo />
        </div>

        <div className="footer__item footer__item--nav">
          <div className="footer__item-list">
            <NavList location="footer" />
          </div>
        </div>

        <div className="footer__item footer__item--contacts">
          <ul className="footer__item-list--contacts footer__item-list">
            <li className="footer__contact-info">
              <p className="footer__contact-title">Physical address</p>
              <a
                href="https://maps.app.goo.gl/VhAycvH7Cek52o5a6"
                target="_blank"
                rel="noreferrer"
                className="footer__contact-link"
              >
                Lviv city, Frankivsk district, Naukova Street 32,
                <br />
                Organization for homeless animals &quot;Pets Home&quot;
              </a>
            </li>

            <li className="footer__contact-info">
              <p className="footer__contact-title">Contact phone</p>
              <a href="tel:+380669718922" className="footer__contact-link">
                +38 066 971 89 22
              </a>
            </li>

            <li className="footer__contact-info">
              <p className="footer__contact-title">E-mail address</p>
              <a
                href="mailto:petshome.contactus@gmail.com"
                className="footer__contact-link"
              >
                petshome.contactus@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__item footer__item--rights">
          <p className="footer__team-name">Mates Team</p>

          <p className="footer__rights-text">© 2024. All rights reserved</p>
        </div>
      </div>
    </Container>
  </footer>
));
