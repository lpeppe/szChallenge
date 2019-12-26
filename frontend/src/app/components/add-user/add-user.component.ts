import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"]
})
export class AddUserComponent implements OnInit {
  @ViewChild("form", { static: false }) form: NgForm;

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.form);
    this.form.resetForm();
  }
}
