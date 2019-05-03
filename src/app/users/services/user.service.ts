import { Injectable } from '@angular/core';
import { UsersStateFacade } from '../../store/facades/users.state.facade';
import { UsersQuery } from '../../store/queries/users.query';
import { IUser, IUserService } from '../users.types';
import { Observable, of } from 'rxjs';
import { UsersApiService } from '../../api/services/users.api.service';
import { take, tap } from 'rxjs/operators';
import { MessagesService } from '../../messages/services/messages.service';
import { CommonTexts } from '../../configuration/models/common.texts';
import { MainConfigService } from '../../configuration/services/main.config.service';

@Injectable()
export class UserService implements IUserService {
  private texts: CommonTexts;
  constructor(
    private usersStateFacade: UsersStateFacade,
    private usersQuery: UsersQuery,
    private userApiService: UsersApiService,
    private messageService: MessagesService,
    private config: MainConfigService
  ) {
    this.texts = this.config.commonTexts();
  }

  getRawUserList(): IUser[] {
    return this.usersQuery.getRawUserList();
  }

  initUsersList() {
    this.userApiService.getAllUsers().subscribe((users: IUser[]) => {
      this.usersStateFacade.setUsersList(users);
    });
  }

  getUserList(): Observable<IUser[]> {
    return this.usersQuery.getUsersList();
  }

  addNewUser(username: string): Observable<IUser> {
    const userId: number = this.usersStateFacade.generateId();
    return this.userApiService.createUser({
      id: userId,
      name: username
    }).pipe(
        take(1),
        tap((createdUser: IUser) => {
          if (createdUser) {
            this.usersStateFacade.addUser(createdUser);
            this.messageService.addSuccessMessage(this.texts.userCreatingSuccess);
          }
        }, () => {
          this.messageService.addErrorMessage(this.texts.userCreatingError);
        })
      );
  }

  updateUserData({ id, ...restData }: IUser): Observable<IUser> {
    return this.userApiService.updateUser(id, restData)
      .pipe(
        tap(
          (updatedUser: IUser) => {
          this.usersStateFacade.updateUser(
            id,
            restData
          );
          this.messageService.addSuccessMessage(this.texts.userEditingSuccess);
        },
          () => {
            this.messageService.addErrorMessage(this.texts.userUpdatingError);
          }
        )
      );
  }
}
