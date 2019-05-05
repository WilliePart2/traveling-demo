import { QueryEntity } from '@datorama/akita';
import { IUserCountriesState, IUsersCountriesQuery, TFilterFunction } from '../store.types';
import { UserCountriesStore } from '../states/user.countries.state';
import { from, Observable } from 'rxjs';
import { IExtUsersCountry, IUserCountriesFilterStatement, IUsersCountry } from '../../user-countries/user.countries.types';
import { UsersQuery } from './users.query';
import { CountryQuery } from './country.query';
import { audit, auditTime, last, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { ICountry } from '../../countries/country.types';
import { IUser } from '../../users/users.types';
import { Injectable } from '@angular/core';
import { UpdatedUserCountriesQuery } from './updated.user.countries.query';

@Injectable()
export class UserCountriesQuery extends QueryEntity<IUserCountriesState, IUsersCountry> implements IUsersCountriesQuery {
  constructor(
    protected store: UserCountriesStore,
    private usersQuery: UsersQuery,
    private countriesQuery: CountryQuery,
    private updatedCountriesQuery: UpdatedUserCountriesQuery
  ) {
    super(store);
  }

  private getSources(): Observable<any> {
    return combineLatest(
      this.countriesQuery.getCountryList(),
      this.selectAll(),
      this.usersQuery.selectAll({ asObject: true }),
      this.updatedCountriesQuery.getUpdatedCountries()
    );
  }

  getUsersCountries(filters?: IUserCountriesFilterStatement): Observable<IExtUsersCountry[]> {
    return this.getSources().pipe(
      /**
       * countries - main country list which we take as basis
       * usersCountries - list of user countries
       * users - list of users
       * updatedCountries - list of updated countries created from usersCountries
       */
      map(([ countries, usersCountries, users, updatedCountries ]) => {
        return countries.reduce((countriesList: IExtUsersCountry[], country: ICountry) => {
          let isUserCountry = false;
          /**
           * Filter by country name if it provided
           */
          if (filters && filters.countryNameFilter) {
            const isCountryNameMatch: boolean = country.name && (
              country.name.toLowerCase().includes(filters.countryNameFilter.toLowerCase())
            );
            if (!isCountryNameMatch) {
              return countriesList;
            }
          }
          /**
           * Get tmp updated country if exists
           */
          let latestCountryRecord: IExtUsersCountry | IUsersCountry = this.findCountryById<ICountry, IExtUsersCountry>(
            country,
            updatedCountries
          );
          if (latestCountryRecord) {
            isUserCountry = (latestCountryRecord as IExtUsersCountry).isUserCountry;
          }
          /**
           * If updated country not exists get country from user countries list
           */
          if (!latestCountryRecord) {
            latestCountryRecord = this.findCountryById<ICountry, IUsersCountry>(
              country,
              usersCountries
            );
            if (latestCountryRecord) {
              isUserCountry = true;
            }
          }
          let userCountryId: number;
          let visited = false;
          let hasVisa = false;
          let userId: number = null;
          let user: IUser = null;

          if (latestCountryRecord) {
            userCountryId = latestCountryRecord.id;
            visited = latestCountryRecord.visited;
            hasVisa = latestCountryRecord.hasVisa;
            userId = latestCountryRecord.userId;
            user = users[userId];
          }

          if (!user && filters && filters.extraData && filters.extraData.selectedUser) {
            user = filters.extraData.selectedUser;
          }

          const finalCountryObj: IExtUsersCountry = {
            id: userCountryId || country.id,
            countryId: country.id,
            userId,
            user,
            country,
            hasVisa,
            visited,
            isUserCountry
          };

          if (filters.hasVisa !== undefined && finalCountryObj.hasVisa !== filters.hasVisa) {
            return countriesList;
          }

          if (filters.visited !== undefined && finalCountryObj.visited !== filters.visited) {
            return countriesList;
          }

          if (filters.countryId !== undefined && finalCountryObj.countryId !== filters.countryId) {
            return countriesList;
          }

          if (filters.userId !== undefined && finalCountryObj.user.id !== filters.userId) {
            return countriesList;
          }

          countriesList.push(finalCountryObj);

          return countriesList;
        }, []);
      })
    );
  }

  private findCountryById<T, R = IUsersCountry>(targetCountry: T, countryList: R[]): R {
    return countryList.find((country: R) => {
      return (country as IUsersCountry).countryId === (targetCountry as ICountry).id;
    });
  }
}
