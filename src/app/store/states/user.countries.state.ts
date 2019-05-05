import { EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { IUserCountriesState } from '../store.types';
import { IUsersCountry } from '../../user-countries/user.countries.types';

@Injectable()
@StoreConfig({ name: 'user_countries' })
export class UserCountriesStore extends EntityStore<IUserCountriesState, IUsersCountry> {
  constructor() {
    super();
  }
}
