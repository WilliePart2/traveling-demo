import { BaseStateFacade } from './base.state.facade';
import { ICountryStateFacade } from '../store.types';
import { ICountry } from '../../countries/country.types';
import { CountryStore } from '../states/countries.state';
import { CountryQuery } from '../queries/country.query';
import { Injectable } from '@angular/core';

@Injectable()
export class CountriesStateFacade extends BaseStateFacade implements ICountryStateFacade {
  constructor(
    protected store: CountryStore,
    protected query: CountryQuery
  ) {
    super(query);
  }

  addCountry(country: ICountry): void {
    this.store.add(country);
  }

  setCountryList(countryList: ICountry[]): void {
    this.store.set(countryList);
  }

  updateCountry(id: number, country: Partial<ICountry>): void {
    this.store.update(id, country);
  }
}
