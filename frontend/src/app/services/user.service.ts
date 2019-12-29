import { User } from "./../models/user.model";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";
import { UserData } from "../models/usersData.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private serviceUrl = "http://localhost:3333/api/v1";
  constructor(private http: HttpClient) {}

  getUserData(pageIndex: number, pageSize: number): Observable<UserData> {
    return this.http.get(`${this.serviceUrl}/users`, {
      params: new HttpParams()
        .set("pageIndex", pageIndex.toString())
        .set("pageSize", pageSize.toString())
    }) as Observable<UserData>;
  }

  addUser(userData: User) {
    return this.http.post(`${this.serviceUrl}/addUser`, userData);
  }
}
