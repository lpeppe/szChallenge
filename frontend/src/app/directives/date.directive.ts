import {
  Directive,
  Renderer2,
  OnInit,
  ElementRef,
  HostListener,
  OnChanges,
  HostBinding,
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked
} from "@angular/core";

@Directive({
  selector: "[appDate]"
})
export class DateDirective implements OnInit, AfterContentInit {
  @HostBinding("value") date = "";
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener("keyup") keyUp(event) {
    console.log(this.date);
  }
  ngOnInit() {
    // this.renderer.
  }
  ngAfterContentInit() {
    this.date = "test";
  }
}
