import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ICountriesApi } from '../api.types';
import { ICountry } from '../../countries/country.types';
import { Observable } from 'rxjs';

@Injectable()
export class CountriesApiService implements ICountriesApi {
  constructor(private api: ApiService) {}

  createCountry(country: ICountry): Observable<ICountry> {
    const { id, ...restData} = country;
    return this.api.makePostRequest('/countries', restData);
  }

  getAllCountries(): Observable<ICountry[]> {
    return this.api.makeGetRequest<ICountry[]>('/countries');
  }

  updateCountry(id: number, updatedData: Partial<ICountry>): Observable<ICountry> {
    return this.api.makePatchRequest(`/countries/${id}`, updatedData);
  }
}
