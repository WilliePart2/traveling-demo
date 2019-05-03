import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersMainPageComponent } from './users/components/users-main-page/users-main-page.component';
import { RoutingConfig } from './configuration/models/routing.config';
import { CountriesMainPageComponent } from './countries/components/countries-main-page/countries-main-page.component';
import { UserCountriesMainPageComponent } from './user-countries/components/user-countries-main-page/user-countries-main-page.component';

const routes: Routes = [
  {
    path: RoutingConfig.USERS,
    component: UsersMainPageComponent
  },
  {
    path: RoutingConfig.COUNTRIES,
    component: CountriesMainPageComponent
  },
  {
    path: RoutingConfig.USER_COUNTRIES,
    component: UserCountriesMainPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
