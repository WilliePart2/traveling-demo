import { CommonTexts } from './models/common.texts';
import { MessagesConfig } from './models/messages.config';
import { ApiConfig } from './models/api.config';

export interface ICommonTexts {
  usernameFieldLabel: string;
  selectUserFieldLabel: string;
  addUserBtn: string;
  editUserBtnText: string;
  createUserTabName: string;
  editUserTabName: string;
  countryCreatedSuccessfully: string;
  countryUpdatedSuccessfully: string;
  countryCreateLabel: string;
  countryUpdateLabel: string;
  addCountryBtnText: string;
  updateCountryBtnText: string;
  countryName: string;
  selectCountry: string;
  applyFilters: string;
  applyChanges: string;

  // menu labels
  users: string;
  countries: string;
  userCountries: string;

  // select labels
  visited: string;
  notVisited: string;
  empty: string;
  hasVisa: string;
  notHasVisa: string;

  // error labels
  usernameErrorMsg: string;
  userCreatingError: string;
  selectingUserError: string;
  userUpdatingError: string;
  countryUpdatingError: string;
  countryCreatingError: string;
  countryNameError: string;
  countrySelectError: string;
  hasVisaFieldLabel: string;
  visitedFieldLabel: string;

  // general error
  necessaryInitFailed: string;

  // success labels
  userCreatingSuccess: string;

  userEditingSuccess: string;
}

export interface IMessagesConfig {
  stdTimeToShowMessage: number;
}

export interface IRoutingConfig {}

export interface IApiConfig {
  getServerUrl(): string;
}

export interface IAppConfig {
  apiConfig(): ApiConfig;
  commonTexts(): CommonTexts;
  messagesConfig(): MessagesConfig;
}
