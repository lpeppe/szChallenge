import { UserData } from "./../../models/usersData.model";
import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { map, switchMap, tap } from "rxjs/operators";
import { Observable, of as observableOf, merge } from "rxjs";

import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
/**
 * Data source for the UsersTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UsersTableDataSource extends DataSource<User> {
  totalLength: number;
  paginator: MatPaginator;

  constructor(private userService: UserService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<User[]> {
    const getUsrDataObs = () =>
      this.userService
        .getUserData(this.paginator.pageIndex, this.paginator.pageSize)
        .pipe(
          tap(({ total }) => (this.totalLength = total)),
          map(userData => userData.data)
        );

    return merge(
      getUsrDataObs(),
      this.paginator.page.pipe(switchMap(() => getUsrDataObs()))
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}
}
