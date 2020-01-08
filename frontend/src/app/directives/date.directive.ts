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
/**
 * Directive to properly format the input date field
 */
@Directive({
  selector: "input[appDate]",
  providers: [TEST_VALUE_ACCESSOR]
})
export class DateDirective implements ControlValueAccessor {
  /** @ignore */
  onChange = (_: any) => {};
  /** @ignore */
  onTouched = () => {};

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  /** @ignore */
  writeValue(value: any): void {
    const normalizedValue = value == null ? "" : value;
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      "value",
      normalizedValue
    );
  }

  /** @ignore */
  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  /** @ignore */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /** @ignore */
  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      "disabled",
      isDisabled
    );
  }

  /**
   * Accept only numbers and backspace
   */
  @HostListener("keydown", ["$event"])
  _handleKeyDown($event: KeyboardEvent): void {
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

  /**
   * Set the field as touched on blur
   */
  @HostListener("blur", ["$event"])
  _handleBlur($event: KeyboardEvent): void {
    this.onTouched();
  }

  /**
   * On input event format date properly
   */
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
