import React, { memo } from 'react';
import './AdoptionPage.scss';
import { AdoptForm } from '../../components/AdoptForm/AdoptForm';

export const AdoptionPage: React.FC = memo(() => {
  return (
    <div className="adoption">
      <div className="adoption__content">
        <AdoptForm />
      </div>
    </div>
  );
});
