import { Observable } from 'rxjs';

export interface ICountry {
  id: number;
  name: string;
}

export interface ICountryService {
  initializeCountryList(): void;
  getCountryList(): Observable<ICountry[]>;
  getRawCountryList(): ICountry[];
  addCountry(countryName: string): Observable<ICountry>;
  updateCountry(id: number, countryName: string): Observable<ICountry>;
}

export interface ICountryManagingComponent {
  btnText: string;
  // updateCountry(): void;
  // switchModeToCreating(): void;
  // switchModeToUpdating(): void;
  // countryNameFill(name: string);
  // createCountry(): void;
  makeActionWithCountry(): void;
  countryNameUpdate(name: string);
  countrySelect(country: ICountry): void;
}

export enum TCountryManagingModes {
  CREATING,
  UPDATING
}
