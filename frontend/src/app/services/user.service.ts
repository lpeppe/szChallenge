import { User } from "./../models/user.model";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "./../../environments/environment";

import { Observable } from "rxjs";
import { UserData } from "../models/usersData.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private serviceUrl = `http://${environment.backendDomain}:3333/api/v1`;
  constructor(private http: HttpClient) {}

  getUserData(
    pageIndex: number,
    pageSize: number,
    filter: string
  ): Observable<UserData> {
    let params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString());
    if (filter !== "") {
      params = params.set("filter", filter);
    }
    return this.http.get(`${this.serviceUrl}/users`, {
      params
    }) as Observable<UserData>;
  }

  addUser(userData: User) {
    return this.http.post(`${this.serviceUrl}/addUser`, userData);
  }
}
