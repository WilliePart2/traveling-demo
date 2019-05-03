import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { UsersModule } from './users/users.module';
import { CountriesModule } from './countries/countries.module';
import { UserCountriesModule } from './user-countries/user-countries.module';
import { StoreModule } from './store/store.module';
import { MenuModule } from './menu/menu.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ApiModule } from './api/api.module';
import { MessagesModule } from './messages/messages.module';
import { MatSnackBarModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    ConfigurationModule,
    MatSnackBarModule,
    MessagesModule,
    ApiModule,
    StoreModule,
    MenuModule,
    UsersModule,
    CountriesModule,
    UserCountriesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
