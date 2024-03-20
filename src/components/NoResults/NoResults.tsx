import './NoResults.scss';
import React, { ReactNode, memo } from 'react';

type Props = {
  children: ReactNode;
};

export const NoResults: React.FC<Props> = memo(({ children }) => (
  <div className="no-results">
    <h3 className="no-results__title">
      It seems we couldn&apos;t find any pets.
    </h3>

    {children}

    <div className="no-results__paws"></div>
  </div>
));
