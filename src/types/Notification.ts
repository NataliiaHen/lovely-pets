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
