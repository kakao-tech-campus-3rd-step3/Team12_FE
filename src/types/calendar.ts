export type ModalType = 'add' | 'edit' | 'delete';

export type CalendarEvent = {
  id: string;
  title: string;
  start: string | Date;
  end: string | Date;
  private?: boolean;
};
