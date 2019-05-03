import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IFormComponent } from '../../../common-ui/common.ui.types';
import { FormControl, Validators } from '@angular/forms';
import { CommonTexts } from '../../../configuration/models/common.texts';
import { MainConfigService } from '../../../configuration/services/main.config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-country-creating-form',
  templateUrl: './country-creating-form.component.html',
  styleUrls: ['./country-creating-form.component.scss']
})
export class CountryCreatingFormComponent implements OnInit, IFormComponent {
  @Output() fillCountryName: EventEmitter = new EventEmitter<string>();
  countryName: FormControl = new FormControl('', [
    Validators.required
  ]);
  countryNameSub: Subscription;
  get isValid(): boolean {
    return this.countryName.valid;
  }
  texts: CommonTexts;

  constructor(private config: MainConfigService) { }

  ngOnInit() {
    this.texts = this.config.commonTexts();
    this.countryNameSub = this.countryName.valueChanges.subscribe(
      (name: string) => {
        this.fillCountryName.emit(name.trim());
      }
    );
  }

  reset(): void {
    this.countryName.reset();
  }

}
