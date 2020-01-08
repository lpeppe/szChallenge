import { UserService } from "./../../services/user.service";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";

import { UsersTableComponent } from "./users-table.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { HttpClientModule } from "@angular/common/http";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { of } from "rxjs/internal/observable/of";

const stubData = [
  {
    id: 7,
    firstName: "Aaron",
    surname: "Gentili",
    dateOfBirth: "27/12/1995",
    email: "dolca@huhfe.th"
  },
  {
    id: 13,
    firstName: "Mildred",
    surname: "Klaassen",
    dateOfBirth: "01/10/2001",
    email: "dar@bohopo.kh"
  }
];

describe("UsersTableComponent", () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersTableComponent],
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
        MatInputModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should compile", () => {
    expect(component).toBeTruthy();
  });

  it("should contain table headers", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelector("th.mat-column-firstName").textContent
    ).toContain("Nome");

    expect(
      compiled.querySelector("th.mat-column-surname").textContent
    ).toContain("Cognome");

    expect(
      compiled.querySelector("th.mat-column-dateOfBirth").textContent
    ).toContain("Data di nascita");

    expect(compiled.querySelector("th.mat-column-email").textContent).toContain(
      "Email"
    );
  });

  it("should contain paginator", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("div.mat-paginator-container")).toBeDefined();
  });

  it("should contain filter", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("div.mat-form-field-infix")).toBeDefined();
  });

  it("should load users properly", () => {
    const compiled = fixture.debugElement.nativeElement;
    const dataSource = fixture.debugElement.componentInstance.dataSource;
    spyOn(dataSource, "connect").and.returnValue(of(stubData));
    fixture.detectChanges();
    expect(
      compiled.querySelector("tr:nth-child(1) > td.mat-column-firstName")
        .textContent
    ).toContain("Aaron");
    expect(
      compiled.querySelector("tr:nth-child(1) > td.mat-column-surname")
        .textContent
    ).toContain("Gentili");
    expect(
      compiled.querySelector("tr:nth-child(1) > td.mat-column-dateOfBirth")
        .textContent
    ).toContain("27/12/1995");
    expect(
      compiled.querySelector("tr:nth-child(1) > td.mat-column-email")
        .textContent
    ).toContain("dolca@huhfe.th");
    expect(
      compiled.querySelector("tr:nth-child(2) > td.mat-column-firstName")
        .textContent
    ).toContain("Mildred");
    expect(
      compiled.querySelector("tr:nth-child(2) > td.mat-column-surname")
        .textContent
    ).toContain("Klaassen");
    expect(
      compiled.querySelector("tr:nth-child(2) > td.mat-column-dateOfBirth")
        .textContent
    ).toContain("01/10/2001");
    expect(
      compiled.querySelector("tr:nth-child(2) > td.mat-column-email")
        .textContent
    ).toContain("dar@bohopo.kh");
  });
});
