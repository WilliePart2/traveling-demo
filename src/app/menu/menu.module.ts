import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MatListModule, MatSidenavModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainMenuComponent
  ],
  exports: [
    MainMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    MatSidenavModule,
    MatListModule
  ]
})
export class MenuModule { }
