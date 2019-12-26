import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTable } from "@angular/material/table";
import { UsersTableDataSource } from "./users-table-datasource";

import { User } from "./../models/user.model";
import { UserService } from "./../services/user.service";

@Component({
  selector: "app-users-table",
  templateUrl: "./users-table.component.html",
  styleUrls: ["./users-table.component.scss"]
})
export class UsersTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) table: MatTable<User>;
  dataSource: UsersTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["firstName", "surname", "dateOfBirth", "email"];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.dataSource = new UsersTableDataSource(this.userService);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
