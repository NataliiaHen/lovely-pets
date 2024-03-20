import './NavList.scss';
import { NavLink } from 'react-router-dom';
import React, { memo } from 'react';
import classNames from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('nav-list__item', 'nav-list__item-after', {
    'nav-list__item--is-active': isActive,
  });

type Props = {
  location?: string;
};

export const NavList: React.FC<Props> = memo(({ location = 'header' }) => {
  return (
    <div
      className={classNames('nav-list__items', `nav-list__items--${location}`)}
    >
      <NavLink to="/" className={getLinkClass}>
        About us
      </NavLink>

      <NavLink to="/give-for-adoption" className={getLinkClass}>
        Give for Adoption
      </NavLink>

      <NavLink to="/favorites" className={getLinkClass}>
        Favorited Pets
      </NavLink>

      <NavLink to="/contacts" className={getLinkClass}>
        Contact us
      </NavLink>
    </div>
  );
});
