import { Injectable } from '@angular/core';
import {
  IAddUserCountryStatement,
  IExtUsersCountry,
  IFetchCountriesFilterStatement, ISortedUpdatedCountries, IUserCountriesFilterStatement,
  IUserCountriesService,
  IUsersCountry
} from '../user.countries.types';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { UsersCountriesApiService } from '../../api/services/users.countries.api.service';
import { UsersCountriesStateFacade } from '../../store/facades/users.countries.state.facade';
import { UserCountriesQuery } from '../../store/queries/user.countries.query';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CountriesService } from '../../countries/services/countries.service';
import { UserService } from '../../users/services/user.service';
import { UpdatedUserCountriesFacade } from '../../store/facades/updated.user.countries.facade';
import { UpdatedUserCountriesQuery } from '../../store/queries/updated.user.countries.query';
import { ICountry } from '../../countries/country.types';
import { IUser } from '../../users/users.types';

@Injectable()
export class UserCountriesService implements IUserCountriesService {
  // updatingSub: Subscription;

  constructor(
    private api: UsersCountriesApiService,
    private stateFacade: UsersCountriesStateFacade,
    private updatedCountriesFacade: UpdatedUserCountriesFacade,
    private query: UserCountriesQuery,
    private updatedCountriesQuery: UpdatedUserCountriesQuery,
    private countriesService: CountriesService,
    private usersService: UserService
  ) {}

  loadInitialData(): void {
    this.countriesService.initializeCountryList();
    this.usersService.initUsersList();
  }

  fetchCountriesByFilter(filter?: IFetchCountriesFilterStatement): Observable {
    return this.api.getUserCountriesList(filter)
      .pipe(
        tap((countriesList: IUsersCountry[]) => {
          this.stateFacade.setUsersCountry(countriesList);
        })
      );
  }

  addTmpUpdatedCountry(country: IExtUsersCountry): void {
    this.updatedCountriesFacade.addUpdatedCountry(country);
  }

  applyChangesToUpdatedCountries(user: IUser): void {
    this.updatedCountriesQuery.selectAll()
      .pipe(take(1))
      .subscribe((updatedCountries: IExtUsersCountry[]) => {
          const sortedCountries: ISortedUpdatedCountries = updatedCountries.reduce(
            (sortedList: ISortedUpdatedCountries, country: IExtUsersCountry) => {
              if (country.isUserCountry) {
                if (!country.visited && !country.hasVisa) {
                  sortedList.countriesForDelete.push(
                    this.castCountryToUsersCountry(country)
                  );
                } else {
                  sortedList.countriesForUpdate.push(
                    this.castCountryToUsersCountry(country)
                  );
                }
              } else {
                if (country.visited || country.hasVisa) {
                  sortedList.countriesForAdd.push(this.castCountryToUsersCountry(
                    country
                  ));
                }
              }

              return sortedList;
            },
            {
              countriesForAdd: [],
              countriesForDelete: [],
              countriesForUpdate: []
            }
          );


          const operationsArr: Observable<IUsersCountry[]>[] = [];
          if (sortedCountries.countriesForUpdate.length) {
            operationsArr.push(
              this.api.updateUserCountries(sortedCountries.countriesForUpdate)
            );
          }
          if (sortedCountries.countriesForAdd.length) {
            operationsArr.push(
              this.api.addUserCountries(sortedCountries.countriesForAdd)
            );
          }
          if (sortedCountries.countriesForDelete.length) {
            operationsArr.push(
              this.api.removeUserCountries(sortedCountries.countriesForDelete)
            );
          }

          return combineLatest(operationsArr)
            .pipe(take(1))
            .subscribe(() => {
              this.updatedCountriesFacade.resetUpdatedCountries();
              setTimeout(() => {
                this.fetchCountriesByFilter({userId: user.id})
                  .subscribe(() => {});
              }, 50);
            });
        }
      );
  }

  private castCountryToUsersCountry(country: IExtUsersCountry, newId?: number): IUsersCountry {
    return {
      id: newId || country.id,
      countryId: country.countryId,
      userId: country.user.id,
      visited: country.visited,
      hasVisa: country.hasVisa
    };
  }

  getCountriesByFilter(filter?: IUserCountriesFilterStatement): Observable<IExtUsersCountry[]> {
    return this.query.getUsersCountries(filter);
  }
}
