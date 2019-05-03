import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonTexts } from '../../../configuration/models/common.texts';
import { IFormComponent } from '../../../common-ui/common.ui.types';

@Component({
  selector: 'app-user-creating-form',
  templateUrl: './user-creating-form.component.html',
  styleUrls: ['./user-creating-form.component.scss']
})
export class UserCreatingFormComponent implements OnInit, OnDestroy, IFormComponent {
  username: FormControl = new FormControl('', Validators.required);
  private usernameUpdating$: Subscription;
  @Output() usernameUpdate: EventEmitter<string> = new EventEmitter<string>();
  get isValid(): boolean {
    return this.username.valid;
  }

  constructor(public texts: CommonTexts) { }

  ngOnInit() {
    this.usernameUpdating$ = this.username.valueChanges.subscribe(
      (username: string) => {
        this.usernameUpdate.emit(username);
      }
    );
  }

  ngOnDestroy() {
    this.usernameUpdating$.unsubscribe();
  }

  reset() {
    this.username.reset();
  }
}
