import {
  Directive,
  ElementRef,
  Renderer2,
  forwardRef,
  HostListener
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export const TEST_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateDirective),
  multi: true
};

@Directive({
  selector: "input[appDate]",
  providers: [TEST_VALUE_ACCESSOR]
})
export class DateDirective implements ControlValueAccessor {
  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  // this gets called when the value gets changed from the code outside
  writeValue(value: any): void {
    const normalizedValue = value == null ? "" : value;
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      "value",
      normalizedValue
    );
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      "disabled",
      isDisabled
    );
  }

  // just as an example - let's make this field accept only numbers
  @HostListener("keydown", ["$event"])
  _handleKeyDown($event: KeyboardEvent): void {
    // accept only numbers or backspace
    if (
      ($event.keyCode < 48 ||
        $event.keyCode > 57 ||
        ($event.target as any).value.length >= 10) &&
      $event.keyCode !== 8
    ) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  // set the input field as touched with the blur event
  @HostListener("blur", ["$event"])
  _handleBlur($event: KeyboardEvent): void {
    this.onTouched();
  }

  @HostListener("input", ["$event"])
  _handleInput($event: any): void {
    if (
      // if the user doesn't press the backspace
      $event.keyCode !== 8 &&
      ($event.target.value.length === 2 || $event.target.value.length === 5) &&
      $event.data
    ) {
      ($event.target as any).value = `${($event.target as any).value}/`;
    }
    this.onChange(($event.target as any).value);
  }
}
