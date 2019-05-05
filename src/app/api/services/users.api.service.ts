import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IUsersApi } from '../api.types';
import { Observable } from 'rxjs';
import { IUser } from '../../users/users.types';

@Injectable()
export class UsersApiService implements IUsersApi {
  constructor(private api: ApiService) {}

  createUser(user: IUser): Observable<IUser> {
    const { id, ...restData } = user;
    return this.api.makePostRequest<IUser>('/users', restData);
  }

  getAllUsers(): Observable<IUser[]> {
    return this.api.makeGetRequest<IUser[]>('/users');
  }

  updateUser(id: number, updatedData: Partial<IUser>): Observable<IUser> {
    return this.api.makePatchRequest<IUser>(`/users/${id}`, updatedData);
  }
}
