import { IUser } from '../users/users.types';
import { ICountry } from '../countries/country.types';
import { IUserCountriesFilterStatement } from '../store/store.types';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { CommonTexts } from '../configuration/models/common.texts';

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

export interface IUserCountriesFilterStatement {
  userId?: number;
  visited?: boolean;
  hasVisa?: boolean;
  countryId?: number;
  countryNameFilter?: string;
  extraData: ICountriesMappingData;
}

export interface ICountriesMappingData {
  selectedUser: IUser;
}

export interface IFetchCountriesFilterStatement {
  userId: number;
}

export interface IUserCountriesService {
  loadInitialData(): void;
  fetchCountriesByFilter(filter?: IFetchCountriesFilterStatement): Observable;
  getCountriesByFilter(filter?: IUserCountriesFilterStatement): Observable<IExtUsersCountry[]>;
  addTmpUpdatedCountry(country: IExtUsersCountry): void;
  applyChangesToUpdatedCountries(user: IUser): void;
}

export interface IUserCountriesControllerComponent {
  countriesData: Observable<IExtUsersCountry[]>;
  hasUpdatedData: boolean;
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

export interface IActionSeectionComponent {
  saveChangesFired: EventEmitter<void>;
  canAcceptAction: boolean;
  texts: CommonTexts;
  onSaveChanges(): void;
}

export interface ISortedUpdatedCountries {
  countriesForDelete: IUsersCountry[];
  countriesForUpdate: IUsersCountry[];
  countriesForAdd: IUsersCountry[];
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
