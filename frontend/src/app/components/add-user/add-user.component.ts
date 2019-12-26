import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "./../../services/user.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"]
})
export class AddUserComponent implements OnInit {
  @ViewChild("form", { static: false }) form: NgForm;

  constructor(private userService: UserService) {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.form.value);
    this.userService
      .addUser(this.form.value)
      .subscribe(_ => this.form.resetForm(), console.error);
  }
}
