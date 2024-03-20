import './Menu.scss';
import React, { memo, useEffect, useRef } from 'react';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Logo } from '../Logo';
import { IconBox } from '../IconBox';

type Props = {
  closeMenu: () => void;
};

export const Menu: React.FC<Props> = memo(({ closeMenu }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerRefValue = menuRef.current;

    if (!observerRefValue) {
      return undefined;
    }

    disableBodyScroll(observerRefValue);

    return () => observerRefValue && enableBodyScroll(observerRefValue);
  }, []);

  return (
    <aside className="menu" ref={menuRef}>
      <div className="menu__top">
        <Logo />

        <div className="menu__icon-link menu__icon-link--close">
          <IconBox>
            <ReactSVG src="img/icon/close.svg" onClick={closeMenu} />
          </IconBox>
        </div>
      </div>

      <ul className="menu__list">
        <li className="menu__item">
          <Link to="/" className="menu__link" onClick={closeMenu}>
            About us
          </Link>
        </li>

        <li className="menu__item">
          <Link
            to="/give-for-adoption"
            className="menu__link"
            onClick={closeMenu}
          >
            Give for Adoption
          </Link>
        </li>

        <li className="menu__item">
          <Link to="/favorites" className="menu__link" onClick={closeMenu}>
            Favorited Pets
          </Link>
        </li>

        <li className="menu__item">
          <Link to="/contacts" className="menu__link" onClick={closeMenu}>
            Contact us
          </Link>
        </li>
      </ul>
    </aside>
  );
});
