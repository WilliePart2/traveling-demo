import { BaseStateFacade } from './base.state.facade';
import { IUsersCountriesStateFacade } from '../store.types';
import { IUsersCountry } from '../../user-countries/user.countries.types';
import { UserCountriesQuery } from '../queries/user.countries.query';
import { UserCountriesStore } from '../states/user.countries.state';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersCountriesStateFacade extends BaseStateFacade implements IUsersCountriesStateFacade {
  constructor(
    protected query: UserCountriesQuery,
    private store: UserCountriesStore
  ) {
    super(query);
  }

  addUsersCountry(country: IUsersCountry): void {
    this.store.add(country);
  }
  setUsersCountry(countryList: IUsersCountry[]): void {
    this.store.set(countryList);
  }

  updateUsersCountry(id: number, updatingData: Partial<IUsersCountry>): void {
    this.store.update(id, updatingData);
  }

  removeUsersCountry(id: number): void {
    this.store.remove(id);
  }
}
