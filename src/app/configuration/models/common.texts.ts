import { Injectable } from '@angular/core';
import { ICommonTexts } from '../configuration.types';

@Injectable()
export class CommonTexts implements ICommonTexts {
  empty = 'Пусто';
  hasVisa = 'Есть виза';
  notHasVisa = 'Нет визы';
  notVisited = 'Не посещено';
  visited = 'Посещено';
  countries = 'Страны';
  userCountries = 'Страны пользователя';
  users = 'Пользователи';
  countryName = 'Имя страны';
  countryNameError = 'Имя страны должно быть указано';
  countrySelectError = 'You should select the country';
  selectCountry = 'Select country';
  addCountryBtnText = 'Добавить страну';
  updateCountryBtnText = 'Редактировать страну';
  countryCreateLabel = 'Create country';
  countryUpdateLabel = 'Update country';
  countryCreatedSuccessfully = 'Страна успешно создана';
  countryUpdatedSuccessfully = 'Страна успешно обновлена';
  countryCreatingError = 'При создании страны произошла ошибка';
  countryUpdatingError = 'При обновлении данных страны произощла ощибка';
  necessaryInitFailed = 'Необходимая иницализация произошла с ошибкой. Пожалуйста запустите приложение позже.';
  userCreatingError = 'При создании пользователя произощла ошибка. Пожалуйста попробуйте позже';
  userCreatingSuccess = 'Пользователь успешно создан';
  userEditingSuccess = 'Данные пользователя отредактированны';
  userUpdatingError = 'Произошла ошибка при при сохранении редактированных данных. Пожалуйста попробуйте позже.';
  selectUserFieldLabel = 'Select user';
  selectingUserError = 'User should be selected!';
  editUserBtnText = 'Редактировать пользователя';
  createUserTabName = 'Create user';
  editUserTabName = 'Edit user';
  usernameErrorMsg = 'Имя пользователя должно быть заполнено';
  addUserBtn = 'Добавить пользователя';
  usernameFieldLabel = 'Имя пользователя';
  applyFilters = 'Применить';
  applyChanges = 'Применить и сохранить';
  hasVisaFieldLabel = 'Наличие визы';
  visitedFieldLabel = 'Посещено';
}
