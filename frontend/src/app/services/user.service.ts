import { User } from "./../models/user.model";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { UserData } from "../models/usersData.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private serviceUrl = "http://localhost:3333/api/v1";
  constructor(private http: HttpClient) {}

  getUsers(pageIndex: number, pageSize: number): Observable<User[]> {
    return (this.http.get(
      `${this.serviceUrl}/users?pageIndex=${pageIndex}&pageSize=${pageSize}`
    ) as Observable<UserData>).pipe(map(({ data }) => data));
  }

  getUserData(pageIndex: number, pageSize: number): Observable<UserData> {
    return this.http.get(
      `${this.serviceUrl}/users?pageIndex=${pageIndex}&pageSize=${pageSize}`
    ) as Observable<UserData>;
  }

  addUser(userData: User) {
    return this.http.post(`${this.serviceUrl}/addUser`, userData);
  }
}
