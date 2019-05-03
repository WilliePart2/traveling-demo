import { Injectable } from '@angular/core';
import { MessagesConfig } from '../models/messages.config';
import { CommonTexts } from '../models/common.texts';
import { IAppConfig } from '../configuration.types';
import { ApiConfig } from '../models/api.config';

@Injectable()
export class MainConfigService implements IAppConfig {
  constructor(
    private msgConfig: MessagesConfig,
    private texts: CommonTexts,
    private api: ApiConfig
  ) {}

  apiConfig(): ApiConfig {
    return this.api;
  }

  commonTexts(): CommonTexts {
    return this.texts;
  }

  messagesConfig() {
    return this.msgConfig;
  }
}
