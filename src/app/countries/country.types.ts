import { Observable } from 'rxjs';

export interface ICountry {
  id: number;
  name: string;
}

export interface ICountryService {
  initializeCountryList(): void;
  getCountryList(): Observable<ICountry>;
  getRawCountryList(): ICountry[];
  addCountry(countryName: string): Observable<ICountry>;
  updateCountry(id: number, countryName: string): Observable<ICountry>;
}

export interface ICountryManagingComponent {
  createCountry(): void;
  updateCountry(): void;
  switchModeToCreating(): void;
  switchModeToUpdating(): void;
  countryNameFill(name: string);
  countryNameUpdate(name: string);
  countrySelect(country: ICountry): void;
}
