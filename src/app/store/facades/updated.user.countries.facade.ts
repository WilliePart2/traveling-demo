import { Injectable } from '@angular/core';
import { IUpdatedUserCountriesStateFacade } from '../store.types';
import { BaseStateFacade } from './base.state.facade';
import { IExtUsersCountry } from '../../user-countries/user.countries.types';
import { UpdatedUserCountriesQuery } from '../queries/updated.user.countries.query';
import { UpdatedUserCountriesStore } from '../states/user.countries.state';

@Injectable()
export class UpdatedUserCountriesFacade extends BaseStateFacade implements IUpdatedUserCountriesStateFacade {
  constructor(
    protected query: UpdatedUserCountriesQuery,
    private store: UpdatedUserCountriesStore
  ) {
    super(query);
  }

  addUpdatedCountry(country: IExtUsersCountry): void {
    const {id, ...countryData} = country;
    this.store.upsert(id, countryData);
  }

  resetUpdatedCountries(): void {
    this.store.reset();
  }

}
