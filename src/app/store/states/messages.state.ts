import { EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { IMessagesState } from '../store.types';
import { IMessage } from '../../messages/messages.types';

@Injectable()
@StoreConfig({ name: 'messages' })
export class MessagesStore extends EntityStore<IMessagesState, IMessage> {
  constructor() {
    super();
  }
}
