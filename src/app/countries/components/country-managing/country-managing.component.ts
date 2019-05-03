import { Component, OnInit } from '@angular/core';
import { MainConfigService } from '../../../configuration/services/main.config.service';
import { CommonTexts } from '../../../configuration/models/common.texts';
import { ICountry, ICountryManagingComponent } from '../../country.types';

@Component({
  selector: 'app-country-managing',
  templateUrl: './country-managing.component.html',
  styleUrls: ['./country-managing.component.scss']
})
export class CountryManagingComponent implements OnInit, ICountryManagingComponent {
  texts: CommonTexts;
  constructor(private config: MainConfigService) { }
  ngOnInit() {
    this.texts = this.config.commonTexts();
  }

  countryNameFill(name: string) {
  }

  countryNameUpdate(name: string) {
  }

  countrySelect(country: ICountry): void {
  }

  createCountry(): void {
  }

  switchModeToCreating(): void {
  }

  switchModeToUpdating(): void {
  }

  updateCountry(): void {
  }
}
