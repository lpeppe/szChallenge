import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { map, switchMap, tap } from "rxjs/operators";
import { Observable, of as observableOf, merge } from "rxjs";

import { UserService } from "./../services/user.service";
import { User } from "./../models/user.model";
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
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const { pageIndex, pageSize } = this.paginator;
    console.log(pageSize);
    this.userService
      .getUserData(pageIndex, pageSize)
      .subscribe(({ total }) => (this.totalLength = total));

    const dataMutations = [
      this.userService.getUsers(pageIndex, pageSize),
      this.paginator.page
    ];

    return merge(...dataMutations).pipe(
      switchMap(() =>
        this.userService.getUsers(
          this.paginator.pageIndex,
          this.paginator.pageSize
        )
      )
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // private getPagedData() {
  //   const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //   return data.splice(startIndex, this.paginator.pageSize);
  // }
}
