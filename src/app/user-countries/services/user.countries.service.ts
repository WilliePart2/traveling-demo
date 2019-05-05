import { Injectable } from '@angular/core';
import { IAddUserCountryStatement, IExtUsersCountry, IUserCountriesService, IUsersCountry } from '../user.countries.types';
import { Observable } from 'rxjs';
import { IUserCountriesFilterStatement } from '../../store/store.types';
import { UsersCountriesApiService } from '../../api/services/users.countries.api.service';
import { UsersCountriesStateFacade } from '../../store/facades/users.countries.state.facade';
import { UserCountriesQuery } from '../../store/queries/user.countries.query';
import { tap } from 'rxjs/operators';
import { CountriesService } from '../../countries/services/countries.service';
import { UserService } from '../../users/services/user.service';

@Injectable()
export class UserCountriesService implements IUserCountriesService {
  constructor(
    private api: UsersCountriesApiService,
    private stateFacade: UsersCountriesStateFacade,
    private query: UserCountriesQuery,
    private countriesService: CountriesService,
    private usersService: UserService
  ) {}

  loadInitialData(): void {
    this.countriesService.initializeCountryList();
    this.usersService.initUsersList();
  }

  fetchCountriesByFilter(filter?: IUserCountriesFilterStatement): Observable {
    return this.api.getUserCountriesList(filter)
      .pipe(
        tap((countriesList: IUsersCountry[]) => {
          this.stateFacade.setUsersCountry(countriesList);
        })
      );
  }

  addUserCountry(data: IAddUserCountryStatement): Observable<IUsersCountry> {
    return undefined;
  }

  getCountriesByFilter(filter?: IUserCountriesFilterStatement): Observable<IExtUsersCountry[]> {
    return this.query.getUsersCountries(filter);
  }

  updateUserCountry(updatedCountry: Partial<IUsersCountry>): Observable<IUsersCountry> {
    return undefined;
  }
}
