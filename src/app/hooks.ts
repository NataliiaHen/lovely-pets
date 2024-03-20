/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import type { TypeRootState, AppDispatch } from './store';
import { notificationActions } from '../storage/notification';

const allActions = {
  ...notificationActions,
};

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TypeRootState> = useSelector;

export const useThunkDispatch = () => {
  const dispatch = useDispatch<AppDispatch>();

  return dispatch as ThunkDispatch<TypeRootState, void, any>;
};

export const useActions = () => {
  const dispatch = useAppDispatch();

  return bindActionCreators(allActions, dispatch);
};
