import { Injectable } from '@angular/core';
import { IUsersQuery, IUsersState } from '../store.types';
import { IUser } from '../../users/users.types';
import { Observable } from 'rxjs';
import { UsersStore } from '../states/users.state';
import { QueryEntity } from '@datorama/akita';
import { BaseQuery } from './base.query';

@Injectable()
export class UsersQuery extends BaseQuery<IUsersState, IUser> implements IUsersQuery {
  constructor(protected store: UsersStore) {
    super(store);
  }

  getRawUserList(): IUser[] {
    return this.getEntitiesAsArray<IUser>();
  }

  getUsersCount(): number {
    return this.getCount();
  }

  getUsersList(): Observable<IUser[]> {
    return this.selectAll();
  }
}
