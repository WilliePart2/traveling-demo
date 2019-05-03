import { Injectable } from '@angular/core';
import { CountriesApiService } from '../../api/services/countries.api.service';
import { MainConfigService } from '../../configuration/services/main.config.service';
import { CountriesStateFacade } from '../../store/facades/countries.state.facade';
import { CountryQuery } from '../../store/queries/country.query';
import { ICountry, ICountryService } from '../country.types';
import { from, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { MessagesService } from '../../messages/services/messages.service';
import { CommonTexts } from '../../configuration/models/common.texts';

@Injectable()
export class CountriesService implements ICountryService {
  private texts: CommonTexts;
  constructor(
    private api: CountriesApiService,
    private config: MainConfigService,
    private countriesStateFacade: CountriesStateFacade,
    private query: CountryQuery,
    private message: MessagesService
  ) {
    this.texts = this.config.commonTexts();
  }

  addCountry(countryName: string): Observable<ICountry> {
    const countryId: number = this.countriesStateFacade.generateId();
    return this.api.createCountry({
      id: countryId,
      name: countryName
    }).pipe(
      tap(
        (createdCountry: ICountry) => {
          this.countriesStateFacade.addCountry(createdCountry);
          this.message.addSuccessMessage(
            this.texts.countryCreatedSuccessfully
          );
        },
        () => this.message.addErrorMessage(
          this.texts.countryCreatingError
        )
      )
    );
  }

  getCountryList(): Observable<ICountry[]> {
    return this.query.getCountryList();
    //   .pipe(
    //   mergeMap((countries: ICountry[]) => from(countries))
    // );
  }

  getRawCountryList(): ICountry[] {
    return this.query.getRawCountryList();
  }

  initializeCountryList(): void {
    this.api.getAllCountries().subscribe(
      (countries: ICountry[]) => {
        this.countriesStateFacade.setCountryList(countries);
      },
      () => this.message.addErrorMessage(
        this.texts.necessaryInitFailed
      )
    );
  }

  updateCountry(id: number, countryName: string): Observable<ICountry> {
    return this.api.updateCountry(id, {
      name: countryName
    }).pipe(
      tap(
        (updatedCountry: ICountry) => {
          this.countriesStateFacade.updateCountry(id, updatedCountry);
          this.message.addSuccessMessage(
            this.texts.countryUpdatedSuccessfully
          );
        },
        () => this.message.addErrorMessage(
          this.texts.countryUpdatingError
        )
      )
    );
  }
}
