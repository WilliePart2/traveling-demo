import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { Observable, Subscription } from 'rxjs';
import { IMessage } from '../../messages.types';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-messages-outlet',
  templateUrl: './messages-outlet.component.html',
  styleUrls: ['./messages-outlet.component.scss']
})
export class MessagesOutletComponent implements OnInit {
  messages$: Observable<IMessage>;
  msgSubscription: Subscription;
  constructor(
    private messagesService: MessagesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.messages$ = this.messagesService.getMessages();
    this.msgSubscription = this.messages$.subscribe(
      (message: IMessage) => {
        this.snackBar.open(message.text, 'Close', {
          duration: message.durationToShow
        });
      }
    );
  }
}
