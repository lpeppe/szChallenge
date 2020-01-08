import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AddUserComponent } from "./components/add-user/add-user.component";
import { UsersTableComponent } from "./components/users-table/users-table.component";

const APP_ROUTES: Routes = [
  { path: "users", component: UsersTableComponent },
  { path: "addUser", component: AddUserComponent },
  { path: "", redirectTo: "users", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
