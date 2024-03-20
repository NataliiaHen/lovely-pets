import './ButtonMove.scss';
import React from 'react';
import { ReactSVG } from 'react-svg';

type Props = {
  direction: 'left' | 'right';
  size?: 'small' | 'big';
  onClick?: () => void;
  disabled?: boolean;
};

export const ButtonMove: React.FC<Props> = ({
  direction,
  onClick,
  disabled,
  size = 'small',
}) => (
  <>
    {size === 'big' ? (
      <button
        type="button"
        className={`
          button-move
          button-move--${direction}
          button-move--${size}
        `}
        aria-label={direction === 'left' ? 'previous' : 'next'}
      >
        <ReactSVG
          className="button-move__arrow"
          src={`img/icon/arrow-${direction}.svg`}
        />
      </button>
    ) : (
      <button
        type="button"
        className={`
          button-move
          button-move--${size}
        `}
        onClick={onClick}
        disabled={disabled}
        aria-label={direction === 'left' ? 'previous' : 'next'}
      >
        <ReactSVG
          className="button-move__arrow"
          src={`img/icon/arrow-${direction}.svg`}
        />
      </button>
    )}
  </>
);
