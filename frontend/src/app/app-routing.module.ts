import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UsersComponent } from "./users/users.component";
import { AddUserComponent } from "./add-user/add-user.component";

const routes: Routes = [
  { path: "users", component: UsersComponent },
  { path: "addUser", component: AddUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
