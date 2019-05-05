import { EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { IUpdatedUserContriesState, IUserCountriesState } from '../store.types';
import { IExtUsersCountry, IUsersCountry } from '../../user-countries/user.countries.types';

@Injectable()
@StoreConfig({ name: 'user_countries' })
export class UserCountriesStore extends EntityStore<IUserCountriesState, IUsersCountry> {
  constructor() {
    super();
  }
}

@Injectable()
@StoreConfig({
  name: 'updated_user_countries',
  resettable: true
})
export class UpdatedUserCountriesStore extends EntityStore<IUpdatedUserContriesState, IExtUsersCountry> {
  constructor() {
    super();
  }
}
