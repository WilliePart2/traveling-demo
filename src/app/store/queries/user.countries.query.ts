import { QueryEntity } from '@datorama/akita';
import { IUserCountriesFilterStatement, IUserCountriesState, IUsersCountriesQuery, TFilterFunction } from '../store.types';
import { UserCountriesStore } from '../states/user.countries.state';
import { from, Observable } from 'rxjs';
import { IExtUsersCountry, IUsersCountry } from '../../user-countries/user.countries.types';
import { UsersQuery } from './users.query';
import { CountryQuery } from './country.query';
import { audit, auditTime, last, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { ICountry } from '../../countries/country.types';
import { IUser } from '../../users/users.types';
import { Injectable } from '@angular/core';

@Injectable()
export class UserCountriesQuery extends QueryEntity<IUserCountriesState, IUsersCountry> implements IUsersCountriesQuery {
  constructor(
    protected store: UserCountriesStore,
    private usersQuery: UsersQuery,
    private countriesQuery: CountryQuery
  ) {
    super(store);
  }

  private getSources(filters: IUserCountriesFilterStatement): Observable {
    const countriesFilters: TFilterFunction[] = [];
    const userCountrisFilters: TFilterFunction[] = [];
    const userFilters: TFilterFunction[] = [];

    if (filters.countryId !== undefined) {
      countriesFilters.push(
        (country: ICountry) => country.id === filters.countryId
      );
      userCountrisFilters.push(
        (userCountry: IUsersCountry) => {
          return userCountry.countryId === filters.countryId;
        }
      );
    }

    if (filters.hasVisa !== undefined) {
      const filterFn = (country: IUsersCountry) => {
        return !!country.hasVisa === !!filters.hasVisa;
      };
      userCountrisFilters.push(filterFn);
      countriesFilters.push(filterFn);
    }

    if (filters.visited !== undefined) {
      const filterFn = (country: IUsersCountry) => {
        return !!country.visited === !!filters.visited;
      };
      userCountrisFilters.push(filterFn);
      countriesFilters.push(filterFn);
    }

    if (filters.userId) {
      userFilters.push(
        (user: IUser) => user.id === filters.userId
      );
    }

    return combineLatest(
      this.countriesQuery.selectAll({
        filterBy: countriesFilters as any
      }),
      this.selectAll({
        filterBy: userCountrisFilters as any
      }),
      this.usersQuery.selectAll({
        asObject: true,
        filterBy: userFilters as any
      })
    );
  }

  getUsersCountries(filters?: IUserCountriesFilterStatement): Observable<IExtUsersCountry[]> {
    return this.getSources(filters || {}).pipe(
      map(([ countries, usersCountries, users ]) => {
        return countries.map((country: ICountry) => {
          const userCountry: IUsersCountry = usersCountries.find(
            (usersCountry: IUsersCountry) => {
              return usersCountry.countryId === country.id;
            }
          );
          let userCountryId: number;
          let visited = false;
          let hasVisa = false;
          let userId: number = null;
          let user: IUser = null;

          if (userCountry) {
            userCountryId = userCountry.id;
            visited = userCountry.visited;
            hasVisa = userCountry.hasVisa;
            userId = userCountry.userId;
            user = users[userId];
          }

          return {
            id: userCountryId || country.id,
            countryId: country.id,
            userId,
            user,
            country,
            hasVisa,
            visited,
            isUserCountry: !!userCountry
          } as IExtUsersCountry;
        });
      })
    );
  }
}
