import './ModalAdoptForm.scss';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { ReactSVG } from 'react-svg';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { PickUpForm } from '../PickUpForm';
import { IconBox } from '../IconBox';

export const ModalAdoptForm: React.FC = memo(() => {
  const [showForm, setShowForm] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef(null);
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const isModalOpen = sessionStorage.getItem('isModalOpen') === 'true';

  const handleClose = () => {
    navigate(state.previousLocation.pathname);
    sessionStorage.removeItem('isModalOpen');
  };

  const handleFormClose = useCallback(() => {
    setShowForm(false);
  }, []);

  const handleModalClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const observerRefValue = modalRef.current;

    if (!observerRefValue || !id || isModalOpen) {
      handleClose();

      return undefined;
    }

    setShowForm(true);

    const handleModalOpen = () => {
      sessionStorage.setItem('isModalOpen', 'true');
    };

    handleModalOpen();

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="modal"
      onDoubleClick={handleModalClick}
      ref={modalRef}
      key={id}
    >
      <RemoveScroll className="scroll">
        <CSSTransition
          in={showForm}
          timeout={300}
          nodeRef={nodeRef}
          classNames="modal__fade"
          appear
          onExited={() => handleClose()}
        >
          <div className="modal__content">
            <div className="modal__top">
              <h3 className="modal__title">Pick up your animal</h3>
              <div className="modal__cross">
                <IconBox>
                  <ReactSVG
                    src="img/icon/close.svg"
                    onClick={() => setShowForm(false)}
                  />
                </IconBox>
              </div>
            </div>

            {id && <PickUpForm id={id} handleFormClose={handleFormClose} />}
          </div>
        </CSSTransition>
      </RemoveScroll>
    </div>
  );
});
