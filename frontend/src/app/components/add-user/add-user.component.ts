import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "./../../services/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";

/**
 * Component containing the form to submit new users
 */
@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"]
})
export class AddUserComponent implements OnInit {
  /**
   * The form that contains user data
   */
  @ViewChild("form", { static: false }) form: NgForm;

  /**
   * The FormGroup associated to the add user form
   */
  addUserForm: FormGroup;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Initializes the FormGroup with validators
   */
  ngOnInit() {
    this.addUserForm = new FormGroup({
      firstName: new FormControl(null, [
        // allow the user to enter only letters and space
        Validators.pattern(/^[a-zA-Z\s]*$/),
        Validators.required
      ]),
      surname: new FormControl(null, [
        // allow the user to enter only letters and space
        Validators.pattern(/^[a-zA-Z\s]*$/),
        Validators.required
      ]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      dateOfBirth: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          // tslint:disable-next-line:max-line-length
          /(^(((0[1-9]|1[0-9]|2[0-8])[/](0[1-9]|1[012]))|((29|30|31)[/](0[13578]|1[02]))|((29|30)[/](0[4,6,9]|11)))[/](19|[2-9][0-9])\d\d$)|(^29[/]02[/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/
        )
      ])
    });
  }

  /**
   * Is invoked upon user submission and uses the userService to
   * submit the new user. After receiving response from the
   * userService, it shows a snackbar notification
   */
  onSubmit() {
    this.userService.addUser(this.addUserForm.value).subscribe(
      _ => {
        // if the user submission is successful, reset form
        // and show the snackbar
        this.form.resetForm();
        this.addUserForm.reset();
        this.openSnackback("Utente aggiunto!");
      },
      () => {
        // if the submission isn't successful, show the snackbar
        this.openSnackback("C'è stato un errore!");
      }
    );
  }
  /**
   * This method is called to show the snackbar
   * @param message The message to show in the snackbar
   */
  private openSnackback(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000
    });
  }
}
