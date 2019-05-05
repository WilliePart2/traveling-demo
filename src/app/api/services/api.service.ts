import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHttpApi, IHttpOptions, TRequestTypes } from '../api.types';
import { MainConfigService } from '../../configuration/services/main.config.service';

@Injectable()
export class ApiService implements IHttpApi {
  constructor(
    private http: HttpClient,
    private config: MainConfigService
  ) {}

  private _getHeaders(additionalHeaders: object): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...additionalHeaders
    });
  }

  private _getParams(data: object): HttpParams {
    return new HttpParams(data);
  }

  private _getAbsoluteUrl(relativeUrl: string) {
    return `${this.config.apiConfig().getServerUrl()}${relativeUrl}`;
  }

  private _makeRequest<T>(method: TRequestTypes, url: string, data?: object, additionalHeaders?: object): Observable<T> {
    const options: IHttpOptions = {} as IHttpOptions;
    options.headers = this._getHeaders(additionalHeaders);
    if ((method === TRequestTypes.GET || method === TRequestTypes.DELETE) && data) {
      options.params = this._getParams(data);
    } else {
      options.body = data;
    }

    return this.http.request<T>(method, this._getAbsoluteUrl(url), options);
  }

  makeGetRequest<T>(url: string, data?: object): Observable<T> {
    return this._makeRequest<T>(TRequestTypes.GET, url, data);
  }

  makePostRequest<T>(url: string, data: object): Observable<T> {
    return this._makeRequest<T>(TRequestTypes.POST, url, data);
  }

  makePutRequest<T>(url: string, data: object): Observable<T> {
    return this._makeRequest<T>(TRequestTypes.PUT, url, data);
  }

  makePatchRequest<T>(url: string, data: object): Observable<T> {
    return this._makeRequest<T>(TRequestTypes.PATCH, url, data);
  }

  makeDeleteRequest<T>(url: string, data?: object): Observable<T> {
    return this._makeRequest<T>(TRequestTypes.DELETE, url, data);
  }
}
