import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesOutletComponent } from './components/messages-outlet/messages-outlet.component';
import { MessagesService } from './services/messages.service';

@NgModule({
  declarations: [MessagesOutletComponent],
  providers: [
    MessagesService
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MessagesOutletComponent
  ]
})
export class MessagesModule { }
