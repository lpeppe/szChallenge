import { DataSource } from "@angular/cdk/collections";
import { catchError } from "rxjs/operators";
import { Observable, of, BehaviorSubject } from "rxjs";

import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
/**
 * Data source for the UsersTable view. This class
 * encapsulates all logic for fetching and manipulating the displayed data
 */
export class UsersTableDataSource extends DataSource<User> {
  /**
   * The total number of users
   */
  totalLength: number;
  /**
   * The behaviorsubject that emits new users
   */
  private usersSubject = new BehaviorSubject<User[]>([]);

  constructor(private userService: UserService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the users to be rendered.
   */
  connect(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.usersSubject.complete();
  }

  /**
   * Retrieves user data from the userService and emits
   * new values on the usersSubject
   * @param pageIndex The index of the page
   * @param pageSize The page size
   * @param filter The filter to be applied
   */
  loadUsers(pageIndex: number, pageSize: number, filter = "") {
    this.userService
      .getUserData(pageIndex, pageSize, filter)
      .pipe(
        // if the observable errors out just emit an empty array
        catchError(() => of({ data: [], total: 0 }))
      )
      .subscribe(({ data, total }) => {
        this.totalLength = total;
        this.usersSubject.next(data);
      });
  }
}
