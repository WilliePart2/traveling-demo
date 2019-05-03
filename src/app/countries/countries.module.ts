import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesMainPageComponent } from './components/countries-main-page/countries-main-page.component';
import { CountryManagingComponent } from './components/country-managing/country-managing.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTabsModule} from '@angular/material';
import { CommonUIModule } from '../common-ui/common-ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import {CountriesService} from './services/countries.service';

@NgModule({
  declarations: [
    CountriesMainPageComponent,
    CountryManagingComponent
  ],
  providers: [
    CountriesService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonUIModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ]
})
export class CountriesModule { }
