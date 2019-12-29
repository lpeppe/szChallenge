import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "./../../services/user.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"]
})
export class AddUserComponent implements OnInit, AfterViewInit {
  @ViewChild("form", { static: false }) form: NgForm;
  date: string;

  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.cd.detectChanges();
  }
  onSubmit() {
    console.log(this.form.value);
    this.userService
      .addUser(this.form.value)
      .subscribe(_ => this.form.resetForm(), console.error);
  }
  test() {
    this.date.concat("1");
  }
}
