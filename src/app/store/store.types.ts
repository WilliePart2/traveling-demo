import { EntityState } from '@datorama/akita';
import { IUser } from '../users/users.types';
import { ICountry } from '../countries/country.types';
import { Observable } from 'rxjs';
import { IMessage } from '../messages/messages.types';
import { IExtUsersCountry, IUserCountriesFilterStatement, IUsersCountry } from '../user-countries/user.countries.types';

export interface IUsersState extends EntityState<IUser> {}

export interface ICountriesState extends EntityState<ICountry> {}

export interface IMessagesState extends EntityState<IMessage> {}

export interface IUserCountriesState extends EntityState<IUsersCountry> {}

export interface IUpdatedUserContriesState extends EntityState<IExtUsersCountry> {}

export interface IUsersQuery {
  getUsersList(): Observable<IUser[]>;
  getRawUserList(): IUser[];
  getUsersCount(): number;
}

export interface IStateFacade {
  generateId(): number;
}

export interface IUsersStateFacade extends IStateFacade {
  setUsersList(users: IUser[]): void;
  addUser(user: IUser): void;
  updateUser(id: number, user: Partial<IUser>): void;
}

export interface IMessagesStateFacade extends IStateFacade {
  addMessageToQueue(message: IMessage): void;
  removeMessageFromQueue(id: number): void;
}

export interface IMessagesQuery {
  getMessageList(): Observable<IMessage[]>;
}

export interface ICountryStateFacade extends IStateFacade {
  setCountryList(countryList: ICountry[]): void;
  addCountry(country: ICountry): void;
  updateCountry(id: number, country: Partial<ICountry>): void;
}

export interface ICountryQuery {
  getCountryList(): Observable<ICountry[]>;
  getRawCountryList(): ICountry[];
  getCountriesCount(): number;
}

export interface IUsersCountriesQuery {
  getUsersCountries(filters: IUserCountriesFilterStatement): Observable<IExtUsersCountry[]>;
}

export interface IUsersCountriesStateFacade {
  setUsersCountry(countryList: IUsersCountry[]): void;
  addUsersCountry(country: IUsersCountry): void;
  updateUsersCountry(id: number, updatingData: Partial<IUsersCountry>): void;
  removeUsersCountry(id: number): void;
}

export type TFilterFunction = (item: any, index?: number) => boolean;

export interface IUpdatedUserCountriesQuery {
  getUpdatedCountries(): Observable<IExtUsersCountry[]>;
}

export interface IUpdatedUserCountriesStateFacade extends IStateFacade {
  addUpdatedCountry(country: IExtUsersCountry): void;
  resetUpdatedCountries(): void;
}
