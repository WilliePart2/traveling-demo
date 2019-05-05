import { Injectable } from '@angular/core';
import { IUserCountriesApi } from '../api.types';
import {
  IExtUsersCountry,
  IFetchCountriesFilterStatement,
  IUserCountriesFilterStatement,
  IUsersCountry
} from '../../user-countries/user.countries.types';
import { combineLatest, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { IUser } from '../../users/users.types';
import { ICountry } from '../../countries/country.types';

@Injectable()
export class UsersCountriesApiService implements IUserCountriesApi {
  private apiEndpoint = '/user_countries';
  constructor(private api: ApiService) {}

  removeUserCountries(countries: IUsersCountry[]): Observable<IUsersCountry[]> {
    return combineLatest(
      countries.map((country: IUsersCountry) => {
        const { id } = country;
        return this.api.makeDeleteRequest(`${this.apiEndpoint}/${id}`);
      })
    );
  }

  updateUserCountries(countries: IUsersCountry[]): Observable<IUsersCountry[]> {
    return combineLatest(
      countries.map((country: IUsersCountry) => {
        const { id, ...restData } = country;
        return this.api.makePutRequest(
          `${this.apiEndpoint}/${id}`,
          restData
        );
      })
    );
  }

  addUserCountries(countries: IUsersCountry[]): Observable<IUsersCountry[]> {
    return combineLatest(
      countries.map((country: IUsersCountry) => {
        const { id, ...restData} = country;
        return this.api.makePostRequest(this.apiEndpoint, restData);
      })
    );
  }

  getUserCountriesList(filters?: IFetchCountriesFilterStatement): Observable<IUsersCountry[]> {
    let requestStr = this.apiEndpoint;
    if (filters) {
      requestStr += `?${this.getCountriesFilterStr(filters)}`;
    }

    return this.api.makeGetRequest<IUsersCountry[]>(requestStr);
  }

  private getCountriesFilterStr(filters: IFetchCountriesFilterStatement): string {
    let finalStr = '';
    if (filters.userId) {
      finalStr += `userId=${filters.userId}`;
    }
    return finalStr;
  }
}
