import { Component, OnInit } from '@angular/core';
import { IMenuItem } from '../../menu.types';
import { RoutingConfig } from '../../../configuration/models/routing.config';
import { MainConfigService } from '../../../configuration/services/main.config.service';
import { CommonTexts } from '../../../configuration/models/common.texts';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  texts: CommonTexts;
  menuItems: IMenuItem[] = [];

  constructor(private config: MainConfigService) {
    this.texts = config.commonTexts();
  }

  ngOnInit() {
    this.menuItems = [
      { link: RoutingConfig.USERS, label: this.texts.users },
      { link: RoutingConfig.COUNTRIES, label: this.texts.countries },
      { link: RoutingConfig.USER_COUNTRIES, label: this.texts.userCountries }
    ];
  }
}
