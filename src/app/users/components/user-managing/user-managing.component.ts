import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonTexts } from '../../../configuration/models/common.texts';
import { UserCreatingFormComponent } from '../user-creating-form/user-creating-form.component';
import { UserService } from '../../services/user.service';
import { UserSelectingFormComponent } from '../user-selecting-form/user-selecting-form.component';
import { IUser, TUserManagingModes } from '../../users.types';

@Component({
  selector: 'app-user-managing',
  templateUrl: './user-managing.component.html',
  styleUrls: ['./user-managing.component.scss']
})
export class UserManagingComponent implements OnInit, AfterViewInit {
  @ViewChild(UserCreatingFormComponent)
  private userCreatingRef: UserCreatingFormComponent;
  @ViewChild(UserSelectingFormComponent)
  private userSelectingRef: UserSelectingFormComponent;
  @ViewChild('userUpdating')
  userUpdatingRef: UserCreatingFormComponent;
  private selectedUser: IUser;
  private username: string;
  private mode: TUserManagingModes = TUserManagingModes.CREATING;
  isFormValid = false;

  constructor(
    public texts: CommonTexts,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.initUsersList();
  }

  ngAfterViewInit() {
    this.checkFormValidity();
  }

  private checkFormValidity() {
    this.isFormValid = this.mode === TUserManagingModes.CREATING
      ? this.checkUsernameValidity()
      : this.checkSelectionValidity();
  }

  private checkUsernameValidity(): boolean {
    return this.userCreatingRef.isValid;
  }

  private checkSelectionValidity(): boolean {
    return this.userSelectingRef.isValid && !!this.userUpdatingRef.isValid;
  }

  onUsernameFilled(username: string) {
    this.username = username;
    this.switchModeToCreating();
    this.checkFormValidity();
  }

  onUsernameUpdated(username: string) {
    this.username = username;
    this.switchModeToEditing();
    this.checkFormValidity();
  }

  onUserSelected(user: IUser) {
    this.selectedUser = user;
    this.switchModeToEditing();
    this.checkFormValidity();
  }

  switchModeToCreating() {
    this.mode = TUserManagingModes.CREATING;
  }

  switchModeToEditing() {
    this.mode = TUserManagingModes.EDITING;
  }

  createUser() {
    this.userService.addNewUser(this.username)
      .subscribe(
        (result: IUser) => this.userCreatingRef.reset(),
        () => this.userCreatingRef.reset()
      );
  }

  updateUserData() {
    this.userService.updateUserData({
      ...this.selectedUser,
      name: this.username
    }).subscribe(
      (result: IUser) => this.resetSelect(),
      () => this.resetSelect()
    );
  }

  private resetSelect() {
    this.userSelectingRef.reset();
    this.userUpdatingRef.reset();
  }
}
