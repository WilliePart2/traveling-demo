import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { IUsersState } from '../store.types';
import { IUser } from '../../users/users.types';

const createUsersInitialState = (): IUsersState => {
  return {};
};

@Injectable()
@StoreConfig({ name: 'users' })
export class UsersStore extends EntityStore<IUsersState, IUser> {
  constructor() {
    super(createUsersInitialState());
  }
}
