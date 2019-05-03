import { Observable } from 'rxjs';

export interface IMessage {
  id: number;
  text: string;
  type: TMessageTypes;
  durationToShow: number;
}

export enum TMessageTypes {
  SUCCESS,
  ERROR,
  WARNING
}

export interface IMessagesService {
  getMessages(): Observable<IMessage>;
  // addMessage(message: string, type?: TMessageTypes, timeToShow?: number): void;
  addSuccessMessage(message: string, timeToShow?: number): void;
  addErrorMessage(message: string, timeToShow?: number): void;
}
