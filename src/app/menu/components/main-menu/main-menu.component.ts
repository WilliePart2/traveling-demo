import { Component, OnInit } from '@angular/core';
import { IMenuItem } from '../../menu.types';
import { RoutingConfig } from '../../../configuration/models/routing.config';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  menuItems: IMenuItem[] = [
    { link: RoutingConfig.USERS, label: 'Users' },
    { link: RoutingConfig.COUNTRIES, label: 'Countries' },
    { link: RoutingConfig.USER_COUNTRIES, label: 'User countries' }
  ];

  constructor() { }

  ngOnInit() {}
}
