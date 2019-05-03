import { EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ICountriesState } from '../store.types';
import { ICountry } from '../../countries/country.types';

@Injectable()
@StoreConfig({ name: 'countries' })
export class CountryStore extends EntityStore<ICountriesState, ICountry> {
  constructor() {
    super();

  }
}
