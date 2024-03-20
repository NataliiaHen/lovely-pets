/* eslint-disable consistent-return */
import { CSSTransition } from 'react-transition-group';
import './Notification.scss';
import React, { useEffect, useRef, useState, memo } from 'react';
import { useActions, useAppSelector } from '../../app/hooks';

export const Notification: React.FC = memo(() => {
  const notification = useAppSelector(state => state.notification);
  const [show, setShow] = useState(false);
  const firstRenderRef = useRef(true);
  const { removeNotification } = useActions();
  const nodeRef = useRef(null);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;

      return;
    }

    if (!notification.message) {
      return;
    }

    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
      removeNotification();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear
      nodeRef={nodeRef}
      classNames="notification"
      unmountOnExit
    >
      <h2 className="notification" style={{ color: notification.color }}>
        <p>{notification.message}</p>
      </h2>
    </CSSTransition>
  );
});
