import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTable } from "@angular/material/table";
import { UsersTableDataSource } from "./users-table-datasource";

import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { fromEvent, merge, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";

/**
 * Component containing the table with user data
 */
@Component({
  selector: "app-users-table",
  templateUrl: "./users-table.component.html",
  styleUrls: ["./users-table.component.scss"]
})
export class UsersTableComponent implements AfterViewInit, OnInit, OnDestroy {
  /**
   * The paginator component associated to the table
   */
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  /**
   * The table containing users
   */
  @ViewChild(MatTable, { static: false }) table: MatTable<User>;

  /**
   * The filter input field
   */
  @ViewChild("filterInput", { static: false }) input: ElementRef;

  /**
   * The datasource for the table
   */
  dataSource: UsersTableDataSource;

  /**
   * The minimum page size of the paginator
   */
  minPageSize = 10;

  /**
   * The array containing all the subscriptions of the component
   */
  subscriptions: Subscription[] = [];

  /**
   * Columns displayed in the table
   */
  displayedColumns = ["firstName", "surname", "dateOfBirth", "email"];

  constructor(private userService: UserService) {}

  /**
   * Creates a new datasource for the table and loads users
   * for the first time
   */
  ngOnInit() {
    this.dataSource = new UsersTableDataSource(this.userService);
    this.dataSource.loadUsers(0, this.minPageSize, "");
  }

  /**
   * Associates the newly created datasource to the table and
   * creates the observable that will emit every time new
   * user data needs to be fetched from the backend
   */
  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
    this.subscriptions.push(
      // create a new observable by merging the paginator
      // observable and the keyup event from the input field
      merge(
        // this observable is created from the keyup event
        // associated to the input element, piped with operators
        // to limit the number of the emissions. With the tap
        // operator the pageIndex of the paginator is resetted
        // to 0 every time the user types in the filter field
        this.paginator.page,
        fromEvent(this.input.nativeElement, "keyup").pipe(
          debounceTime(150),
          distinctUntilChanged(),
          tap(() => (this.paginator.pageIndex = 0))
        )
        // every time this observable emits new user
        // data is fetched
      ).subscribe(() => this.loadUsersPage())
    );
  }

  /**
   * Unsubscribes from all the subscriptions every time
   * the component is destroyed
   */
  ngOnDestroy() {
    // clear all the subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Requires new user data from the datasource
   */
  private loadUsersPage() {
    const { pageIndex, pageSize } = this.paginator;

    // load users
    this.dataSource.loadUsers(
      pageIndex,
      pageSize,
      this.input.nativeElement.value
    );
  }
}
