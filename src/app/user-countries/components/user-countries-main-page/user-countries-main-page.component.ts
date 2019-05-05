import { Component, OnInit } from '@angular/core';
import { UserCountriesService } from '../../services/user.countries.service';
import {
  IExtUsersCountry,
  IFetchCountriesFilterStatement,
  IUserCountriesControllerComponent, IUserCountriesFilterStatement,
  THasVisaTypes,
  TVisitedTypes
} from '../../user.countries.types';
import { combineLatest, Observable, of } from 'rxjs';
import { IUser } from '../../../users/users.types';
import { filter, map } from 'rxjs/operators';
import { ICountry } from '../../../countries/country.types';
import { CountriesService } from '../../../countries/services/countries.service';
import { UserService } from '../../../users/services/user.service';


@Component({
  selector: 'app-user-countries-main-page',
  templateUrl: './user-countries-main-page.component.html',
  styleUrls: ['./user-countries-main-page.component.scss']
})
export class UserCountriesMainPageComponent implements OnInit, IUserCountriesControllerComponent {
  hasUpdatedData: boolean;
  private isComponentInited = false;
  private fetureUser: IUser;
  private selectedUser: IUser;
  private countriesList: Observable<IExtUsersCountry[]>;
  get countriesData(): Observable<IExtUsersCountry[]> {
    return this.countriesList;
  }
  private countriesFilter: string;
  private prvSourceCountries: Observable<ICountry[]>;
  get sourceCountries(): Observable<ICountry[]> {
    return this.prvSourceCountries.pipe(
      map((countries: ICountry[]) => {
        return countries.filter((country: ICountry) => {
          if (this.countriesFilter && country.name) {
            return this.checkCountryMatching(this.countriesFilter, country);
          }
          return true;
        });
      })
    );
  }
  userList: Observable<IUser[]>;
  private currentVisitedFilter: TVisitedTypes;
  private currentHasVisaFilter: THasVisaTypes;
  private needToLoadNewData: boolean;

  constructor(
    private userCountriesService: UserCountriesService,
    private countriesService: CountriesService,
    private usersService: UserService
  ) { }

  ngOnInit() {
    this.userCountriesService.loadInitialData();
    this.prvSourceCountries = this.countriesService.getCountryList();
    this.userList = this.usersService.getUserList();
  }

  applyChanges(): void {
    this.userCountriesService.applyChangesToUpdatedCountries(this.selectedUser);
    this.hasUpdatedData = false;
  }

  countryFilterChange(countryName: string): void {
    this.countriesFilter = countryName;
    this.updateCountryList();
  }

  hasVisaFilterChange(hasVisa: THasVisaTypes): void {
    this.currentHasVisaFilter = hasVisa;
    this.updateCountryList();
  }

  loadData(): void {
    this.selectedUser = this.fetureUser;
    this.getFilter().subscribe((filterStatement: IUserCountriesFilterStatement) => {
      this.userCountriesService.fetchCountriesByFilter({
        userId: filterStatement.userId
      } as IFetchCountriesFilterStatement)
        .subscribe(() => {
          if (!this.isComponentInited) {
            this.isComponentInited = true;
          }
          this.needToLoadNewData = false;
          this.updateCountryList(filterStatement);
        });
    });
  }

  setUser(user: IUser): void {
    this.fetureUser = user;
    this.needToLoadNewData = true;
  }

  visitedFilterChange(visited: TVisitedTypes): void {
    this.currentVisitedFilter = visited;
    this.updateCountryList();
  }

  onCountryUpdated(country: IExtUsersCountry) {
    this.userCountriesService.addTmpUpdatedCountry(country);
    this.hasUpdatedData = true;
  }

  private updateCountryList(filterStat?: IUserCountriesFilterStatement) {
    if (!this.isComponentInited) {
      return;
    }

    if (filterStat) {
      this.countriesList = this.userCountriesService.getCountriesByFilter(
        filterStat
      );
    } else {
      this.getFilter().subscribe((filterStatement: IUserCountriesFilterStatement) => {
        this.countriesList = this.userCountriesService.getCountriesByFilter(
          filterStatement
        );
      });
    }
  }

  private checkCountryMatching(countryFilter: string, country: ICountry): boolean {
    return country.name && (
      country.name.toLowerCase().includes(countryFilter.toLowerCase())
    );
  }

  private getFilter(): Observable<IUserCountriesFilterStatement> {
    return this.getSelectedCountryId().pipe(
      map((selectedCountryId: number) => {
        return {
          countryId: selectedCountryId ? selectedCountryId : undefined,
          hasVisa: this.mapHasVisaFilterToBool(),
          visited: this.mapVisitedFilterToBool(),
          userId: this.selectedUser ? this.selectedUser.id : undefined,
          countryNameFilter: this.countriesFilter,
          extraData: {
            selectedUser: this.selectedUser
          }
        };
      })
    );
  }

  private mapVisitedFilterToBool(): boolean {
    switch (this.currentVisitedFilter) {
      case TVisitedTypes.EMPTY:
        return undefined;
      case TVisitedTypes.VISITED:
        return true;
      case TVisitedTypes.NOT_VISITED:
        return false;
    }
  }

  private mapHasVisaFilterToBool(): boolean {
    switch (this.currentHasVisaFilter) {
      case THasVisaTypes.EMPTY:
        return undefined;
      case THasVisaTypes.HAS:
        return true;
      case THasVisaTypes.NO:
        return false;
    }
  }

  private getSelectedCountryId(): Observable<number> {
    return this.prvSourceCountries.pipe(
      map((countries: ICountry[]) => {
        if (!this.countriesFilter) {
          return null;
        }

        return countries.find((country: ICountry) => {
          return country.name && (
            country.name.toLowerCase().trim() === this.countriesFilter.toLowerCase().trim()
          );
        });
      }),
      map((selectedCountry: ICountry) => selectedCountry && selectedCountry.id)
    );
  }
}
