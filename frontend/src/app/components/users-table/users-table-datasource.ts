import { DataSource } from "@angular/cdk/collections";
import { catchError } from "rxjs/operators";
import { Observable, of, BehaviorSubject } from "rxjs";

import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
/**
 * Data source for the UsersTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UsersTableDataSource extends DataSource<User> {
  totalLength: number;
  private usersSubject = new BehaviorSubject<User[]>([]);

  constructor(private userService: UserService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
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
