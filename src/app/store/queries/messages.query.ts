import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { IMessagesQuery, IMessagesState } from '../store.types';
import { IMessage } from '../../messages/messages.types';
import { Observable } from 'rxjs';
import { MessagesStore } from '../states/messages.state';

@Injectable()
export class MessagesQuery extends QueryEntity<IMessagesState, IMessage> implements IMessagesQuery {
  constructor(protected store: MessagesStore) {
    super(store);
  }

  getMessageList(): Observable<IMessage[]> {
    return this.selectAll();
  }
}
