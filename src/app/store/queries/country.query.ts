import { ICountriesState, ICountryQuery } from '../store.types';
import { Observable } from 'rxjs';
import { ICountry } from '../../countries/country.types';
import { CountryStore } from '../states/countries.state';
import { Injectable } from '@angular/core';
import { BaseQuery } from './base.query';

@Injectable()
export class CountryQuery extends BaseQuery<ICountriesState, ICountry> implements ICountryQuery {
  constructor(protected store: CountryStore) {
    super(store);
  }

  getCountriesCount(): number {
    return this.getCount();
  }

  getCountryList(): Observable<ICountry[]> {
    return this.selectAll();
  }

  getRawCountryList(): ICountry[] {
    return this.getEntitiesAsArray<ICountry>();
  }
}
