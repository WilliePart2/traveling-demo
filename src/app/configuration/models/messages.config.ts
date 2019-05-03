import { Injectable } from '@angular/core';
import { IMessagesConfig } from '../configuration.types';

@Injectable()
export class MessagesConfig implements IMessagesConfig{
  stdTimeToShowMessage = 2000;
}
