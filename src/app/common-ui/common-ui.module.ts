import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiGridContainerComponent } from './components/ui-grid-container/ui-grid-container.component';

@NgModule({
  declarations: [
    UiGridContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UiGridContainerComponent
  ]
})
export class CommonUIModule { }
