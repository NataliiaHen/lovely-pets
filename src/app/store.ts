// eslint-disable-next-line import/no-cycle
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  Middleware,
} from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { apiSlice } from '../api/apiSlice';
import { notificationReducer } from '../storage/notification';

const reducers = combineReducers({
  notification: notificationReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const logger = createLogger();

let middleware: Middleware[] = [];

middleware.push(apiSlice.middleware as Middleware);

if (process.env.NODE_ENV === 'development') {
  middleware = [...middleware, logger as Middleware];
}

export const store = configureStore({
  reducer: reducers,
  middleware: gDM => gDM().concat(middleware),
});

export type AppDispatch = typeof store.dispatch;
export type TypeRootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  TypeRootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
