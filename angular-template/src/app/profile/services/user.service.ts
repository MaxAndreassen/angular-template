import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEditor } from '../models/profile.models';
import { APP_CONFIG, IAppConfig } from '../../shared/models/configuration.models';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  updateUser(editor: UserEditor): Observable<UserEditor> {
    const url = `${this.config.apiUrl}users/edit`;
    return this.http.post<UserEditor>(url, editor);
  }

  getUser(uuid: string): Observable<UserEditor> {
    const url = `${this.config.apiUrl}users/${uuid}`;
    return this.http.get<UserEditor>(url);
  }
}
