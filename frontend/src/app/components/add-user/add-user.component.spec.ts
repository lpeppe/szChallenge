import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddUserComponent } from "./add-user.component";
import { UserService } from "src/app/services/user.service";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { HttpClientModule } from "@angular/common/http";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule, FormGroup } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";

describe("AddUserComponent", () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let form: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      providers: [UserService],
      imports: [
        NoopAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSnackBarModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    form = component.form.form;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("form invalid when empty", () => {
    expect(form.valid).toBeFalsy();
  });

  it("email field validation", () => {
    const { email } = form.controls;
    expect(email.valid).toBeFalsy();
    email.setValue("aaaaa");
    expect(email.valid).toBeFalsy();
    email.setValue("user@something.com");
    expect(email.valid).toBeTruthy();
  });

  it("name and surname field validation", () => {
    const { firstName, surname } = form.controls;
    expect(firstName.valid).toBeFalsy();
    expect(surname.valid).toBeFalsy();
    firstName.setValue("aaa1");
    surname.setValue("aaaa2");
    expect(firstName.valid).toBeFalsy();
    expect(surname.valid).toBeFalsy();
    firstName.setValue("aaa");
    surname.setValue("aaaa");
    expect(firstName.valid).toBeTruthy();
    expect(surname.valid).toBeTruthy();
  });

  it("date field validation", () => {
    const date = form.controls.dateOfBirth;
    expect(date.valid).toBeFalsy();
    date.setValue("42234");
    expect(date.valid).toBeFalsy();
    date.setValue("31/02/2000");
    expect(date.valid).toBeFalsy();
    date.setValue("aaa");
    expect(date.valid).toBeFalsy();
    date.setValue("25/02/2000");
    expect(date.valid).toBeTruthy();
  });
});
