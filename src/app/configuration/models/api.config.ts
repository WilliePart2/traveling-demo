import { Injectable } from '@angular/core';
import { IApiConfig } from '../configuration.types';

@Injectable()
export class ApiConfig implements IApiConfig{
  getServerUrl(): string {
    return 'http://localhost:3000';
  }
}
