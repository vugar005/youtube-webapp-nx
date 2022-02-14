import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'yt-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchBoxComponent),
      multi: true,
    },
  ],
})
export class SearchBoxComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() placeholder = 'Search';
  @Input() debounceTime = 300;
  public searchControl = new FormControl();
  public searchOptions = [];

  private readonly onDestroy$ = new Subject<void>();

  public ngOnInit(): void {
    this.initFormListeners();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onChange(newVal: string): void {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  public onTouched(_?: any): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onValidatorChange(_?: any): void {}

  public writeValue(value: string): void {
    this.searchControl.patchValue(value, { emitEvent: false });
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    if (isDisabled === false) {
      this.searchControl.disable({ emitEvent: false });
    } else if (isDisabled) {
      this.searchControl.enable({ emitEvent: false });
    }
  }

  private initFormListeners(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(this.debounceTime), takeUntil(this.onDestroy$))
      .subscribe((value) => this.onChange(value));
  }
}
