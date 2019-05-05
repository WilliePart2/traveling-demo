import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCountriesMainPageComponent } from './components/user-countries-main-page/user-countries-main-page.component';
import { CountriesTableComponent } from './components/countries-table/countries-table.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule, MatSelectModule,
  MatTableModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { UserCountriesService } from './services/user.countries.service';
import { CountriesModule } from '../countries/countries.module';
import { UsersModule } from '../users/users.module';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { ActionsSectionComponent } from './components/actions-section/actions-section.component';

@NgModule({
  declarations: [UserCountriesMainPageComponent, CountriesTableComponent, FilterFormComponent, ActionsSectionComponent],
  providers: [
    UserCountriesService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatAutocompleteModule,
    MatSelectModule,
    CountriesModule,
    UsersModule
  ]
})
export class UserCountriesModule { }
