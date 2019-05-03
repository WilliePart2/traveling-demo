import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationModule } from '../configuration/configuration.module';
import { ApiService } from './services/api.service';
import { UsersApiService } from './services/users.api.service';
import { CountriesApiService } from './services/countries.api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConfigurationModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    UsersApiService,
    CountriesApiService
  ]
})
export class ApiModule { }
