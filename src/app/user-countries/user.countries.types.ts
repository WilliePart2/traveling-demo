import { IUser } from '../users/users.types';
import { ICountry } from '../countries/country.types';
import { IUserCountriesFilterStatement } from '../store/store.types';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

export interface IUsersCountry {
  id: number;
  userId: number;
  countryId: number;
  visited: boolean;
  hasVisa: boolean;
}

export interface IExtUsersCountry extends IUsersCountry {
  user: IUser;
  country: ICountry;
  isUserCountry: boolean;
}

export interface IAddUserCountryStatement {
  user: IUser;
  country: ICountry;
  visited: boolean;
  hasVisa: boolean;
}

export interface IUserCountriesService {
  loadInitialData(): void;
  fetchCountriesByFilter(filter?: IUserCountriesFilterStatement): Observable;
  getCountriesByFilter(filter?: IUserCountriesFilterStatement): Observable<IExtUsersCountry[]>;
  addUserCountry(data: IAddUserCountryStatement): Observable<IUsersCountry>;
  updateUserCountry(updatedCountry: Partial<IUsersCountry>): Observable<IUsersCountry>;
}

export interface IUserCountriesControllerComponent {
  countriesData: Observable<IExtUsersCountry[]>;
  countryFilterChange(countryName: string): void;
  visitedFilterChange(visited: TVisitedTypes): void;
  hasVisaFilterChange(hasVisa: THasVisaTypes): void;
  loadData(): void;
  applyChanges(): void;
  onCountryUpdated(country: IExtUsersCountry): void;
  setUser(user: IUser): void;
}

export interface IFilterFormComponent {
  userList: Observable<IUser[]>;
  countriesList: Observable<ICountry[]>;
  visitedChange: EventEmitter<TVisitedTypes>;
  hasVisaChange: EventEmitter<THasVisaTypes>;
  selectUser: EventEmitter<IUser>;
  getDataFired: EventEmitter<void>;
  countryChange: EventEmitter<string>;
  visitedOptions: TVisitedTypes[];
  hasVisaOptions: THasVisaTypes[];
  isValid: boolean;
  getVisitedSelectLabel(visitedType: TVisitedTypes): string;
  getHasVisaSelectLabel(hasVisaValue: THasVisaTypes): string;
  fireGetData(): void;
}

export enum TVisitedTypes {
  VISITED,
  NOT_VISITED,
  EMPTY
}

export enum THasVisaTypes {
  HAS,
  NO,
  EMPTY
}
