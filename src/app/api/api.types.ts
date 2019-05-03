import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../users/users.types';
import { ICountry } from '../countries/country.types';

export const enum TRequestTypes {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export interface IHttpOptions {
  headers: HttpHeaders;
  params?: HttpParams;
  body: object;
}

export interface IHttpApi {
  makePostRequest<T>(url: string, data: object): Observable<T>;
  makeGetRequest<T>(url: string, data?: object): Observable<T>;
  makePutRequest<T>(url: string, data: object): Observable<T>;
  makePatchRequest<T>(url: string, data: object): Observable<T>;
  makeDeleteRequest<T>(url: string, data: object): Observable<T>;
}

export interface IUsersApi {
  getAllUsers(): Observable<IUser[]>;
  createUser(user: IUser): Observable<IUser>;
  updateUser(id: number, updatedData: Partial<IUser>): Observable<IUser>;
}

export interface ICountriesApi {
  getAllCountries(): Observable<ICountry[]>;
  createCountry(country: ICountry): Observable<ICountry>;
  updateCountry(id: number, updatedData: Partial<ICountry>): Observable<ICountry>;
}
