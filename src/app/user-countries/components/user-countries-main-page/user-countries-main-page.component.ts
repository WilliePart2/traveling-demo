import { Component, OnInit } from '@angular/core';
import { UserCountriesService } from '../../services/user.countries.service';
import { IExtUsersCountry, IUserCountriesControllerComponent, THasVisaTypes, TVisitedTypes } from '../../user.countries.types';
import { combineLatest, Observable, of } from 'rxjs';
import { IUser } from '../../../users/users.types';
import { map } from 'rxjs/operators';
import { ICountry } from '../../../countries/country.types';
import { CountriesService } from '../../../countries/services/countries.service';
import { UserService } from '../../../users/services/user.service';
import { IUserCountriesFilterStatement } from '../../../store/store.types';

@Component({
  selector: 'app-user-countries-main-page',
  templateUrl: './user-countries-main-page.component.html',
  styleUrls: ['./user-countries-main-page.component.scss']
})
export class UserCountriesMainPageComponent implements OnInit, IUserCountriesControllerComponent {
  private updatedCountries: IExtUsersCountry[] = [];
  private countriesList: Observable<IExtUsersCountry[]>;
  private selectedUser: IUser;
  get countriesData(): Observable<IExtUsersCountry[]> {
    return combineLatest(
      of(this.updatedCountries),
      this.countriesList
    ).pipe(
      map(([updatedCountries, countries]) => {
        return countries.map((country: IExtUsersCountry) => {
          const updatedCountry: IExtUsersCountry = updatedCountries.find(
            (updCountr: IExtUsersCountry) => {
              return updCountr.id === country.id;
            }
          );
          const resultingCountry = updatedCountry || country;

          if (!resultingCountry.user) {
            resultingCountry.user = this.selectedUser;
          }

          return resultingCountry;
        });
      })
    );
  }
  private countriesFilter: string;
  private prvSourceCountries: Observable<ICountry[]>;
  get sourceCountries(): Observable<ICountry[]> {
    return this.prvSourceCountries.pipe(
      map((countries: ICountry[]) => {
        return countries.filter((country: ICountry) => {
          if (this.countriesFilter && country.name) {
            return country.name.toLowerCase().includes(this.countriesFilter.toLowerCase());
          }
          return true;
        });
      })
    );
  }
  private currentVisitedFilter: TVisitedTypes;
  private currentHasVisaFilter: THasVisaTypes;
  private needToLoadNewData: boolean;
  userList: Observable<IUser[]>;

  constructor(
    private userCountriesService: UserCountriesService,
    private countriesService: CountriesService,
    private usersService: UserService
  ) { }

  ngOnInit() {
    this.userCountriesService.fetchCountriesByFilter().subscribe(() => {});
    this.userCountriesService.loadInitialData(); // tmp
    this.countriesList = this.userCountriesService.getCountriesByFilter(); // tmp
    this.prvSourceCountries = this.countriesService.getCountryList();
    this.userList = this.usersService.getUserList();
  }

  applyChanges(): void {
  }

  countryFilterChange(countryName: string): void {
    this.countriesFilter = countryName;
    // this.getFilter().subscribe((filterStatement: IUserCountriesFilterStatement) => {
    //   this.countriesList = this.userCountriesService.getCountriesByFilter(
    //     filterStatement
    //   );
    // });
  }

  hasVisaFilterChange(hasVisa: THasVisaTypes): void {
    this.currentHasVisaFilter = hasVisa;
    this.getFilter().subscribe((filterStatement: IUserCountriesFilterStatement) => {
      this.countriesList = this.userCountriesService.getCountriesByFilter(
        filterStatement
      );
    });
  }

  loadData(): void {
    this.getFilter().subscribe((filterStatement: IUserCountriesFilterStatement) => {
      this.userCountriesService.fetchCountriesByFilter(filterStatement)
        .subscribe(() => {
          this.countriesList = this.userCountriesService.getCountriesByFilter(
            filterStatement
          );
          this.needToLoadNewData = false;
        });
    });
  }

  setUser(user: IUser): void {
    this.selectedUser = user;
    this.needToLoadNewData = true;
  }

  visitedFilterChange(visited: TVisitedTypes): void {
    this.currentVisitedFilter = visited;
    this.getFilter().subscribe((filterStatement: IUserCountriesFilterStatement) => {
      this.countriesList = this.userCountriesService.getCountriesByFilter(
        filterStatement
      );
    });
  }

  onCountryUpdated(country: IExtUsersCountry) {
    this.updatedCountries.push(country);
  }

  private getFilter(): Observable<IUserCountriesFilterStatement> {
    return this.getSelectedCountryId().pipe(
      map((selectedCountryId: number) => {
        return {
          countryId: selectedCountryId ? selectedCountryId : undefined,
          hasVisa: this.mapHasVisaFilterToBool(),
          visited: this.mapVisitedFilterToBool(),
          userId: this.selectedUser ? this.selectedUser.id : undefined
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
