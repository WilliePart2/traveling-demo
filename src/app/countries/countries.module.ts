import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesMainPageComponent } from './components/countries-main-page/countries-main-page.component';
import { CountryCreatingFormComponent } from './components/country-creating-form/country-creating-form.component';
import { CountryUpdatingFormComponent } from './components/country-updating-form/country-updating-form.component';
import { CountryManagingComponent } from './components/country-managing/country-managing.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatTabsModule } from '@angular/material';
import { CommonUIModule } from '../common-ui/common-ui.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CountriesMainPageComponent,
    CountryCreatingFormComponent,
    CountryUpdatingFormComponent,
    CountryManagingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonUIModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CountriesModule { }
