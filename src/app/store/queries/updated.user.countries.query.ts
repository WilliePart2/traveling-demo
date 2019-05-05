import { Injectable } from '@angular/core';
import { IUpdatedUserContriesState, IUpdatedUserCountriesQuery } from '../store.types';
import { Observable } from 'rxjs';
import { IExtUsersCountry } from '../../user-countries/user.countries.types';
import { UpdatedUserCountriesStore } from '../states/user.countries.state';
import { QueryEntity } from '@datorama/akita';

@Injectable()
export class UpdatedUserCountriesQuery extends QueryEntity<IUpdatedUserContriesState, IExtUsersCountry>
  implements IUpdatedUserCountriesQuery {
  constructor(protected store: UpdatedUserCountriesStore) {
    super(store);
  }

  getUpdatedCountries(): Observable<IExtUsersCountry[]> {
    return this.selectAll();
  }
}
