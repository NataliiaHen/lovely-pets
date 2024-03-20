import './IconBox.scss';
import React, { memo } from 'react';

type Props = {
  children: React.ReactNode;
};

export const IconBox: React.FC<Props> = memo(({ children }) => (
  <div className="icon__box">{children}</div>
));
