import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersMainPageComponent } from './components/users-main-page/users-main-page.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSelectingFormComponent } from './components/user-selecting-form/user-selecting-form.component';
import { UserCreatingFormComponent } from './components/user-creating-form/user-creating-form.component';
import { UserManagingComponent } from './components/user-managing/user-managing.component';
import { CommonUIModule } from '../common-ui/common-ui.module';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    UsersMainPageComponent,
    UserSelectingFormComponent,
    UserCreatingFormComponent,
    UserManagingComponent
  ],
  providers: [
    UserService
  ],
  imports: [
    CommonModule,
    CommonUIModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class UsersModule { }
