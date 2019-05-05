import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UserCountriesService } from '../../services/user.countries.service';
import { MainConfigService } from '../../../configuration/services/main.config.service';
import { CommonTexts } from '../../../configuration/models/common.texts';
import { Observable, Subscription } from 'rxjs';
import { IExtUsersCountry } from '../../user.countries.types';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss']
})
export class CountriesTableComponent implements OnInit, OnDestroy {
  @Input() countriesList: Observable<IExtUsersCountry[]>;
  @Output() countryChanged: EventEmitter<IExtUsersCountry> = new EventEmitter();
  texts: CommonTexts;
  columnsToDisplay: string[] = [
    'username',
    'countryName',
    'visited',
    'hasVisa'
  ];

  constructor(
    private config: MainConfigService
  ) {
    this.texts = config.commonTexts();
  }

  ngOnInit() {}

  ngOnDestroy() {
  }

  onVisitedChange(country: IExtUsersCountry) {
    this.countryChanged.emit({
      ...country,
      visited: !country.visited
    } as IExtUsersCountry);
  }

  onHasVisaChange(country: IExtUsersCountry) {
    this.countryChanged.emit({
      ...country,
      hasVisa: !country.hasVisa
    } as IExtUsersCountry);
  }

}
