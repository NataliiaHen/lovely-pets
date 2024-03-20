import React, { useEffect, useRef, useState } from 'react';
import './Baner.scss';
import { Container } from '../Container';

export const Baner: React.FC = () => {
  const banerRef = useRef<HTMLDivElement>(null);
  const banerInfoRef = useRef<HTMLDivElement>(null);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (firstLoad) {
        const banerInfo = banerInfoRef.current;
        const baner = banerRef.current;

        if (banerInfo && baner) {
          banerInfo.style.opacity = '1';
          baner.style.transform = 'translateX(0)';
          baner.style.opacity = '1';
          setFirstLoad(false);
        }
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [firstLoad]);

  return (
    <div className="baner page__section">
      <Container>
        <div className="baner__content">
          <div className="baner__container baner__container--img">
            <div className="baner__photo-box" ref={banerRef}>
              <img
                className="baner__photo"
                src="./img/dog-banner.png"
                alt="Banner dog"
              />
            </div>
          </div>

          <div className="baner__container">
            <div className="baner__info" ref={banerInfoRef}>
              <h1 className="baner__title">What is “Pets Home”?</h1>
              <p className="baner__text">
                We transform lives and foster friendships. Our project addresses
                the issue of stray animals through humane adoption solutions.
                Explore our free online platform to discover your new companion
                or assist a pet in finding its family.
                <br />
                <br />
                Welcome to a community where every paw seeks a joyful future!
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
