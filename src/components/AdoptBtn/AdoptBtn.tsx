import './AdoptBtn.scss';
import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  id: number;
  children: React.ReactNode;
}

export const AdoptBtn: React.FC<Props> = memo(({ id, children }) => {
  const location = useLocation();

  const state = {
    search: location.search,
    pathname: location.pathname,
    previousLocation: location,
  };

  return (
    <Link to={`/adopt/${id}`} state={state} className="adopt-btn">
      {children}
    </Link>
  );
});
