import './Loader.scss';
import React, { useEffect } from 'react';

export const Loader: React.FC = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'initial';
    };
  });

  return (
    <div className="loader-overlay">
      <div className="loader-spinner"></div>
    </div>
  );
};
