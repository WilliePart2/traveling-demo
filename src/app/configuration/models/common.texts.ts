import { Injectable } from '@angular/core';
import { ICommonTexts } from '../configuration.types';

@Injectable()
export class CommonTexts implements ICommonTexts {
  countryName = 'Country name';
  countryNameError = 'Country name should be specified';
  countrySelectError = 'You should select the country';
  selectCountry = 'Select country';
  addCountryBtnText = 'Add country';
  updateCountryBtnText = 'Update country';
  countryCreateLabel = 'Create country';
  countryUpdateLabel = 'Update country';
  countryCreatedSuccessfully = 'Country created successfully';
  countryUpdatedSuccessfully = 'Country updated successfully';
  countryCreatingError = 'Country creating failed';
  countryUpdatingError = 'Country updating failed';
  necessaryInitFailed = 'Necessary initialization failed please try run application later';
  userCreatingError = 'Error occur when try to create user. Please try again later.';
  userCreatingSuccess = 'User successfully created';
  userEditingSuccess = 'User data updated';
  userUpdatingError = 'Error occur when try to edit user data. Please try again later.';
  selectUserFieldLabel = 'Select user';
  selectingUserError = 'User should be selected!';
  editUserBtnText = 'Edit user';
  createUserTabName = 'Create user';
  editUserTabName = 'Edit user';
  usernameErrorMsg = 'Username field should be specified!';
  addUserBtn = 'Add user';
  usernameFieldLabel = 'Username';
}
