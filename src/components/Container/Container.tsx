import React, { memo } from 'react';
import './Container.scss';

type Props = {
  children: React.ReactNode;
};

export const Container: React.FC<Props> = memo(({ children }) => {
  return <div className="container">{children}</div>;
});
