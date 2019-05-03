import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainConfigService } from './services/main.config.service';
import { CommonTexts } from './models/common.texts';
import { MessagesConfig } from './models/messages.config';
import { ApiConfig } from './models/api.config';

@NgModule({
  declarations: [],
  providers: [
    CommonTexts,
    MessagesConfig,
    ApiConfig,
    MainConfigService
  ],
  imports: [
    CommonModule
  ],
  // exports: [
  //   MainConfigService
  // ]
})
export class ConfigurationModule { }
