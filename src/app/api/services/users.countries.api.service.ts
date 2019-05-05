import { Injectable } from '@angular/core';
import { IUserCountriesApi } from '../api.types';
import { IUsersCountry } from '../../user-countries/user.countries.types';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { IUserCountriesFilterStatement } from '../../store/store.types';

@Injectable()
export class UsersCountriesApiService implements IUserCountriesApi {
  constructor(private api: ApiService) {}

  private getCountriesFilterStr(filters: IUserCountriesFilterStatement): string {
    let finalStr = '';
    const addAmp = () => finalStr ? '&' : '';
    if (filters.countryId) {
      finalStr += `${addAmp()}countries.id=${filters.countryId}`;
    }
    if (filters.visited) {
      finalStr += `${addAmp()}visited=${filters.visited}`;
    }
    if (filters.hasVisa) {
      finalStr += `${addAmp()}hasVisa=${filters.hasVisa}`;
    }
    if (filters.userId) {
      finalStr += `${addAmp()}users.id=${filters.userId}`;
    }
    return finalStr;
  }

  getUserCountriesList(filters?: IUserCountriesFilterStatement): Observable<IUsersCountry[]> {
    let requestStr = `/user_countries`;
    if (filters) {
      requestStr += `?${this.getCountriesFilterStr(filters)}`;
    }

    return this.api.makeGetRequest<IUsersCountry[]>(requestStr);
  }

  addUserCountry(country: IUsersCountry): Observable<IUsersCountry> {
    return this.api.makePostRequest<IUsersCountry>(
      '/user_countries',
      country
    );
  }

  removeUserCountry(id: number): Observable<IUsersCountry> {
    return this.api.makeDeleteRequest(
      '/user_countries',
      { id }
    );
  }
}
