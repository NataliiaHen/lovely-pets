/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum NotificationStatus {
  Success = '#27ae60',
  Warning = '#F3D060',
  Error = '#BA0C2E',
  None = 'transparent',
}

export type NotificationType = {
  message: string;
  color: NotificationStatus;
};

const initialState: NotificationType = {
  message: '',
  color: NotificationStatus.None,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<NotificationType>) => {
      state.message = action.payload.message;
      state.color = action.payload.color;
    },
    removeNotification: state => {
      state.color = NotificationStatus.None;
      state.message = '';
    },
  },
});

export const notificationActions = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
