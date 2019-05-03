import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CommonTexts} from '../../../configuration/models/common.texts';
import {UserService} from '../../services/user.service';
import {IUser, IUserManagingComponent, TUserManagingModes} from '../../users.types';
import {Observable} from 'rxjs';
import {IFormComponent} from '../../../common-ui/common.ui.types';

@Component({
  selector: 'app-user-managing',
  templateUrl: './user-managing.component.html',
  styleUrls: ['./user-managing.component.scss']
})
export class UserManagingComponent implements OnInit, AfterViewInit, IUserManagingComponent {
  @ViewChild('usernameField') private usernameFieldRef: IFormComponent;
  @ViewChild('userList') private userListRef: IFormComponent;
  private selectedUser: IUser;
  private username: string;
  private mode: TUserManagingModes = TUserManagingModes.CREATING;
  userList$: Observable<IUser[]>;
  isFormValid = false;
  get btnText() {
    return this.mode === TUserManagingModes.CREATING
      ? this.texts.addUserBtn
      : this.texts.editUserBtnText;
  }

  constructor(
    public texts: CommonTexts,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.initUsersList();
    this.userList$ = this.userService.getUserList();
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
    return this.usernameFieldRef.isValid;
  }

  private checkSelectionValidity(): boolean {
    return !!this.selectedUser;
  }

  onUsernameUpdated(username: string) {
    this.username = username;
    if (!username && username !== null) {
      this.switchModeToCreating();
      this.resetFields();
    }
    this.checkFormValidity();
  }

  onUserSelected(user: IUser) {
    this.selectedUser = user;
    if (!user) {
      this.resetFields();
      this.switchModeToCreating();
    } else {
      this.switchModeToEditing();
    }
    this.checkFormValidity();
  }

  switchModeToCreating() {
    this.mode = TUserManagingModes.CREATING;
  }

  switchModeToEditing() {
    this.mode = TUserManagingModes.EDITING;
  }

  makeActionWithUser() {
    if (this.mode === TUserManagingModes.CREATING) {
      this.userService.addNewUser(this.username)
        .subscribe(() => this.resetFields());
    } else {
      this.userService.updateUserData({
        ...this.selectedUser,
        name: this.username
      }).subscribe(() => this.resetFields());
    }
  }

  private resetFields() {
    this.usernameFieldRef.reset();
    this.userListRef.reset();
    this.selectedUser = null;
  }
}
