import { Injectable } from '@angular/core';
import { MessagesStateFacade } from '../../store/facades/messages.state.facade';
import { IMessage, IMessagesService, TMessageTypes } from '../messages.types';
import { from, Observable } from 'rxjs';
import { MainConfigService } from '../../configuration/services/main.config.service';
import { MessagesConfig } from '../../configuration/models/messages.config';
import { MessagesQuery } from '../../store/queries/messages.query';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class MessagesService implements IMessagesService {
  private messagesConfig: MessagesConfig;
  constructor(
    private messagesStateFacade: MessagesStateFacade,
    private messagesQuery: MessagesQuery,
    private configService: MainConfigService
  ) {
    this.messagesConfig = this.configService.messagesConfig();
  }

  addErrorMessage(message: string, timeToShow?: number): void {
    this.addMessage(message, TMessageTypes.SUCCESS, timeToShow);
  }

  addSuccessMessage(message: string, timeToShow?: number): void {
    this.addMessage(message, TMessageTypes.ERROR, timeToShow);
  }

  private addMessage(message: string, type?: TMessageTypes, timeToShow?: number): void {
    const messageId: number = this.messagesStateFacade.generateId();
    const duration: number = timeToShow || this.messagesConfig.stdTimeToShowMessage;
    this.messagesStateFacade.addMessageToQueue({
      id: messageId,
      text: message,
      type: type || TMessageTypes.SUCCESS,
      durationToShow: duration
    });

    setTimeout(
      () => this.messagesStateFacade.removeMessageFromQueue(
        messageId
      ),
      duration
    );
  }

  getMessages(): Observable<IMessage> {
    return this.messagesQuery.getMessageList()
      .pipe(
        mergeMap((messages: IMessage[]) => from(messages))
      );
  }
}
