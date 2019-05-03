import { Observable } from 'rxjs';
import { IFormComponent } from '../common-ui/common.ui.types';

export interface IUser {
  id: number;
  name: string;
}

export interface IUserService {
  initUsersList(): void;
  getUserList(): Observable<IUser[]>;
  getRawUserList(): IUser[];
  addNewUser(username: string): Observable<IUser>;
  updateUserData(user: IUser): Observable<IUser>;
}

export enum TUserManagingModes {
  CREATING,
  EDITING
}
