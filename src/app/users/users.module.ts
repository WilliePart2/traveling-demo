import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersMainPageComponent } from './components/users-main-page/users-main-page.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { UserManagingComponent } from './components/user-managing/user-managing.component';
import { CommonUIModule } from '../common-ui/common-ui.module';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    UsersMainPageComponent,
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
    MatSelectModule,
    MatCardModule
  ]
})
export class UsersModule { }
