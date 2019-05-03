import { Component, OnInit } from '@angular/core';
import { IFormComponent } from '../../../common-ui/common.ui.types';
import { FormControl, Validators } from '@angular/forms';
import { MainConfigService } from '../../../configuration/services/main.config.service';
import { CommonTexts } from '../../../configuration/models/common.texts';

@Component({
  selector: 'app-countries-main-page',
  templateUrl: './countries-main-page.component.html',
  styleUrls: ['./countries-main-page.component.scss']
})
export class CountriesMainPageComponent implements OnInit, IFormComponent {
  countryName: FormControl = new FormControl('', [
    Validators.required
  ]);
  get isValid(): boolean {
    return this.countryName.valid;
  }
  texts: CommonTexts;

  constructor(private config: MainConfigService) { }

  ngOnInit() {
    this.texts = this.config.commonTexts();
  }

  reset(): void {
  }

}
