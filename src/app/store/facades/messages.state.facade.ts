import { BaseStateFacade } from './base.state.facade';
import { IMessagesStateFacade } from '../store.types';
import { IMessage } from '../../messages/messages.types';
import { Injectable } from '@angular/core';
import { MessagesStore } from '../states/messages.state';
import { MessagesQuery } from '../queries/messages.query';

@Injectable()
export class MessagesStateFacade extends BaseStateFacade implements IMessagesStateFacade {
  constructor(
    protected query: MessagesQuery,
    private store: MessagesStore
  ) {
    super(query);
  }

  addMessageToQueue(message: IMessage): void {
    this.store.add(message);
  }

  removeMessageFromQueue(id: number): void {
    this.store.remove(id);
  }
}
