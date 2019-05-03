import {Component, OnInit, ViewChild} from '@angular/core';
import {MainConfigService} from '../../../configuration/services/main.config.service';
import {CommonTexts} from '../../../configuration/models/common.texts';
import {ICountry, ICountryManagingComponent, TCountryManagingModes} from '../../country.types';
import {Observable} from 'rxjs';
import {CountriesService} from '../../services/countries.service';
import {IFormComponent} from '../../../common-ui/common.ui.types';
import {SelectionListComponent} from '../../../common-ui/components/selection-list/selection-list.component';

@Component({
  selector: 'app-country-managing',
  templateUrl: './country-managing.component.html',
  styleUrls: ['./country-managing.component.scss']
})
export class CountryManagingComponent implements OnInit, ICountryManagingComponent {
  @ViewChild('countryName') countryNameForm: IFormComponent;
  @ViewChild('countryList') countryList: SelectionListComponent;
  texts: CommonTexts;
  countryList$: Observable<ICountry[]>;
  private countryName: string;
  selectedCountry: ICountry;
  mode: TCountryManagingModes = TCountryManagingModes.CREATING;
  get btnText(): string {
    return this.mode === TCountryManagingModes.CREATING
      ? this.texts.addCountryBtnText
      : this.texts.updateCountryBtnText;
  }

  constructor(
    private config: MainConfigService,
    private countryService: CountriesService
  ) { }

  ngOnInit() {
    this.texts = this.config.commonTexts();
    this.countryList$ = this.countryService.getCountryList();
    this.countryService.initializeCountryList();
  }

  countryNameUpdate(name: string) {
    this.countryName = name;
    if (!name) {
      this.switchModeToCreating();
      this.countryList.reset();
    }
  }

  countrySelect(country: ICountry): void {
    this.selectedCountry = country;
    this.mode = TCountryManagingModes.UPDATING;
  }

  makeActionWithCountry(): void {
    if (this.mode === TCountryManagingModes.CREATING) {
      this.countryService.addCountry(this.countryName)
        .subscribe(() => this.countryNameForm.reset());
    } else {
      this.countryService.updateCountry(
        this.selectedCountry.id,
        this.countryName
      ).subscribe(() => {
          this.countryNameForm.reset();
          this.countryList.reset();
          this.selectedCountry = null;
          this.switchModeToCreating();
      });
    }
  }

  private switchModeToCreating() {
    this.mode = TCountryManagingModes.CREATING;
  }
}
