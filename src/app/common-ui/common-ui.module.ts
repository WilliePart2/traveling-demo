import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiGridContainerComponent } from './components/ui-grid-container/ui-grid-container.component';
import { SelectionListComponent } from './components/selection-list/selection-list.component';
import {MatDividerModule, MatFormFieldModule, MatInputModule, MatListModule} from '@angular/material';
import { TextFieldComponent } from './components/text-field/text-field.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    UiGridContainerComponent,
    SelectionListComponent,
    TextFieldComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    UiGridContainerComponent,
    SelectionListComponent,
    TextFieldComponent
  ]
})
export class CommonUIModule { }
