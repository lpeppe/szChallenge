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

@Component({
  selector: "app-users-table",
  templateUrl: "./users-table.component.html",
  styleUrls: ["./users-table.component.scss"]
})
export class UsersTableComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) table: MatTable<User>;
  @ViewChild("filterInput", { static: false }) input: ElementRef;
  dataSource: UsersTableDataSource;
  minPageSize = 10;
  subscriptions: Subscription[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["firstName", "surname", "dateOfBirth", "email"];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.dataSource = new UsersTableDataSource(this.userService);
    this.dataSource.loadUsers(0, this.minPageSize, "");
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
    this.subscriptions.push(
      // create a new observable by merging the paginator
      // observable and the keyup event from the input field
      merge(
        this.paginator.page,
        fromEvent(this.input.nativeElement, "keyup").pipe(
          debounceTime(150),
          distinctUntilChanged(),
          tap(() => (this.paginator.pageIndex = 0))
        )
      ).subscribe(() => this.loadUsersPage())
    );
  }

  ngOnDestroy() {
    // clear all the subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadUsersPage() {
    const { pageIndex, pageSize } = this.paginator;

    // load users
    this.dataSource.loadUsers(
      pageIndex,
      pageSize,
      this.input.nativeElement.value
    );
  }
}
