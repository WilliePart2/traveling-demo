import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../users.types';
import { from, Observable, of, Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { filter, map, mergeMap, takeLast } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';
import { CommonTexts } from '../../../configuration/models/common.texts';
import { IFormComponent } from '../../../common-ui/common.ui.types';

@Component({
  selector: 'app-user-selecting-form',
  templateUrl: './user-selecting-form.component.html',
  styleUrls: ['./user-selecting-form.component.scss']
})
export class UserSelectingFormComponent implements OnInit, OnDestroy, IFormComponent {
  @Output() selectUser: EventEmitter<IUser> = new EventEmitter<IUser>();
  userList$: Observable<IUser[]>;
  userSelectBox: FormControl = new FormControl('', [
    Validators.required
  ]);
  userSelectionSub: Subscription;
  get isValid(): boolean {
    return this.userSelectBox.valid;
  }

  constructor(
    private userService: UserService,
    public texts: CommonTexts
  ) { }

  ngOnInit() {
    this.userList$ = this.userService.getUserList();
    this.userSelectionSub = this.userSelectBox.valueChanges.subscribe((userId: number) => {
      const selectedUser: IUser = this.userService.getRawUserList().find(
        (user: IUser) => user && user.id === userId
      );
      this.selectUser.emit(selectedUser);
    });
  }

  ngOnDestroy() {
    this.userSelectionSub.unsubscribe();
  }

  reset() {
    this.userSelectBox.reset();
  }
}
