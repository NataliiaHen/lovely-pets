import './FiltersModal.scss';
import React, { memo, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactSVG } from 'react-svg';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Filters } from '../Filters/Filters';
import { IconBox } from '../IconBox';

type Props = {
  closeMenu: () => void;
};

export const FiltersModal: React.FC<Props> = memo(({ closeMenu }) => {
  const [showForm, setShowForm] = useState(false);
  const filterModalRef = useRef<HTMLDivElement>(null);

  const handleModalClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (event.target === event.currentTarget) {
      setShowForm(false);
    }
  };

  useEffect(() => {
    setShowForm(true);
    const observerRefValue = filterModalRef.current;

    if (!observerRefValue) {
      return undefined;
    }

    disableBodyScroll(observerRefValue, {
      allowTouchMove: el => {
        let targetElement = el;

        while (targetElement && targetElement !== document.body) {
          if (targetElement.classList.contains('allow-scroll')) {
            return true;
          }

          targetElement = targetElement.parentElement || el;
        }

        return false;
      },
    });

    return () => observerRefValue && enableBodyScroll(observerRefValue);
  }, []);

  // useEffect(() => {
  //   setShowForm(true);
  //   const observerRefValue = filterModalRef.current;

  //   if (!observerRefValue) {
  //     return undefined;
  //   }

  //   disableBodyScroll(observerRefValue, {
  //     allowTouchMove: el => el.className === 'filters-modal__content',
  //   });

  //   return () => observerRefValue && enableBodyScroll(observerRefValue);
  // }, []);

  return (
    <div
      className="filters-modal allow-scroll"
      onClick={handleModalClick}
      ref={filterModalRef}
      aria-hidden
    >
      <CSSTransition
        in={showForm}
        timeout={300}
        classNames="modal-fade"
        onExited={closeMenu}
        unmountOnExit
      >
        <div className="filters-modal__content allow-scroll">
          <div className="filters-modal__top">
            <h3 className="filters-modal__title">Filters:</h3>

            <div
              className="
              filters-modal__icon-link"
            >
              <IconBox>
                <ReactSVG
                  src="img/icon/close.svg"
                  onClick={() => setShowForm(false)}
                />
              </IconBox>
            </div>
          </div>

          <Filters closeMenu={closeMenu} />
        </div>
      </CSSTransition>
    </div>
  );
});
