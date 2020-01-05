import { User } from "./../models/user.model";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "./../../environments/environment";

import { Observable } from "rxjs";
import { UserData } from "../models/usersData.model";
/**
 * Service that provides methods to interact with the backend
 */
@Injectable({
  providedIn: "root"
})
export class UserService {
  /**
   * The url of the backend
   */
  serviceUrl = `http://${environment.backendDomain}:3333/api/v1`;
  constructor(private http: HttpClient) {}

  /**
   * Retrieves user data from the backend
   * @param pageIndex The index of the page to retrieve
   * @param pageSize The size of the page
   * @param filter The filter to apply on users
   * @returns Observable emitting users data
   */
  getUserData(
    pageIndex: number,
    pageSize: number,
    filter: string
  ): Observable<UserData> {
    // create params for the GET request
    let params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString());

    // if filter is set add it to the params
    if (filter !== "") {
      params = params.set("filter", filter);
    }

    // return the user data observable
    return this.http.get(`${this.serviceUrl}/users`, {
      params
    }) as Observable<UserData>;
  }

  /**
   * POST new user to the backend
   * @param userData The data of the user to submit
   * @returns Observable that emits if the POST was successful and errors out otherwise
   */
  addUser(userData: User): Observable<any> {
    return this.http.post(`${this.serviceUrl}/addUser`, userData);
  }
}
