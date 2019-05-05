import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { IUser } from '../../../users/users.types';
import { ICountry } from '../../../countries/country.types';
import { IFilterFormComponent, THasVisaTypes, TVisitedTypes } from '../../user.countries.types';
import { MainConfigService } from '../../../configuration/services/main.config.service';
import { CommonTexts } from '../../../configuration/models/common.texts';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit, IFilterFormComponent, OnDestroy {
  @Input() userList: Observable<IUser[]>;
  @Input() countriesList: Observable<ICountry[]>;
  @Output() visitedChange: EventEmitter<TVisitedTypes> = new EventEmitter<TVisitedTypes>();
  @Output() hasVisaChange: EventEmitter<THasVisaTypes> = new EventEmitter<THasVisaTypes>();
  @Output() selectUser: EventEmitter<IUser> = new EventEmitter<IUser>();
  @Output() countryChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() getDataFired: EventEmitter<void> = new EventEmitter<void>();
  filteringForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    country: [''],
    visited: [null],
    hasVisa: [null]
  });
  texts: CommonTexts;
  hasVisaOptions: THasVisaTypes[] = [
    THasVisaTypes.NO,
    THasVisaTypes.HAS,
    THasVisaTypes.EMPTY
  ];
  visitedOptions: TVisitedTypes[] = [
    TVisitedTypes.NOT_VISITED,
    TVisitedTypes.VISITED,
    TVisitedTypes.EMPTY
  ];
  countrySub: Subscription;
  userSub: Subscription;
  visitedSub: Subscription;
  hasVisaSub: Subscription;
  get isValid(): boolean {
    return this.filteringForm.valid;
  }

  constructor(
    private fb: FormBuilder,
    private config: MainConfigService
  ) {
    this.texts = config.commonTexts();
  }

  ngOnInit() {
    this.countrySub = this.filteringForm.get('country').valueChanges
      .subscribe((countryName: string) => {
        this.countryChange.emit(countryName);
      });
    this.userSub = this.filteringForm.get('username').valueChanges
      .subscribe((selectedUser: IUser) => {
        this.selectUser.emit(selectedUser);
      });
    this.visitedSub = this.filteringForm.get('visited').valueChanges
      .subscribe((option: TVisitedTypes) => {
        this.visitedChange.emit(option);
      });
    this.hasVisaSub = this.filteringForm.get('hasVisa').valueChanges
      .subscribe((option: THasVisaTypes) => {
        this.hasVisaChange.emit(option);
      });
  }

  ngOnDestroy() {
    this.countrySub.unsubscribe();
    this.userSub.unsubscribe();
    this.visitedSub.unsubscribe();
    this.hasVisaSub.unsubscribe();
  }

  getHasVisaSelectLabel(hasVisaValue: THasVisaTypes): string {
    switch (hasVisaValue) {
      case THasVisaTypes.EMPTY:
        return 'empty';
      case THasVisaTypes.HAS:
        return 'has';
      case THasVisaTypes.NO:
        return 'no';
    }
  }

  getVisitedSelectLabel(visitedType: TVisitedTypes): string {
    switch (visitedType) {
      case TVisitedTypes.EMPTY:
        return 'empty';
      case TVisitedTypes.VISITED:
        return 'visited';
      case TVisitedTypes.NOT_VISITED:
        return 'not_visited';
    }
  }

  fireGetData() {
    this.getDataFired.emit();
  }
}
