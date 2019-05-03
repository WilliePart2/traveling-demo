import { Injectable } from '@angular/core';
import { IUsersStateFacade } from '../store.types';
import { IUser } from '../../users/users.types';
import { UsersStore } from '../states/users.state';
import { BaseStateFacade } from './base.state.facade';
import { UsersQuery } from '../queries/users.query';

@Injectable()
export class UsersStateFacade extends BaseStateFacade implements IUsersStateFacade {
  constructor(
    private store: UsersStore,
    protected query: UsersQuery
  ) {
    super(query);
  }

  addUser(user: IUser): void {
    this.store.add(user);
  }

  setUsersList(users: IUser[]): void {
    this.store.set(users);
  }

  updateUser(id: number, user: Partial<IUser>): void {
    this.store.update(id, user);
  }
}
