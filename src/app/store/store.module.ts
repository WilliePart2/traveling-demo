import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStore } from './states/users.state';
import { UsersStateFacade } from './facades/users.state.facade';
import { UsersQuery } from './queries/users.query';
import { MessagesStore } from './states/messages.state';
import { MessagesQuery } from './queries/messages.query';
import { MessagesStateFacade } from './facades/messages.state.facade';
import { CountryStore } from './states/countries.state';
import { CountryQuery } from './queries/country.query';
import { CountriesStateFacade } from './facades/countries.state.facade';
import { UserCountriesStore } from './states/user.countries.state';
import { UserCountriesQuery } from './queries/user.countries.query';
import { UsersCountriesStateFacade } from './facades/users.countries.state.facade';

@NgModule({
  declarations: [],
  providers: [
    UsersStore,
    UsersQuery,
    UsersStateFacade,
    MessagesStore,
    MessagesQuery,
    MessagesStateFacade,
    CountryStore,
    CountryQuery,
    CountriesStateFacade,
    UserCountriesStore,
    UserCountriesQuery,
    UsersCountriesStateFacade
  ],
  imports: [
    CommonModule
  ]
})
export class StoreModule { }
