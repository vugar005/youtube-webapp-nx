import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  forwardRef,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, Subject, switchMap, takeUntil } from 'rxjs';
import { IYoutubeService } from '../../models';
import { IYoutubeSearchResult } from '../../models/youtube-search-list.model';
import { YOUTUBE_SERVICE } from '../../tokens';

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
  @Input() debounceTime = 100;
  public searchControl = new FormControl();
  public searchOptions: IYoutubeSearchResult[] = [];

  constructor(@Inject(YOUTUBE_SERVICE) private youtubeService: IYoutubeService, private cdr: ChangeDetectorRef) {}

  private readonly onDestroy$ = new Subject<void>();

  public ngOnInit(): void {
    this.initFormListeners();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  // eslint-disable-next-line
  public onChange(newVal: string): void {}

  // eslint-disable-next-line
  public onTouched(_?: any): void {}

  // eslint-disable-next-line
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

  public onInputEnter(): void {
    this.onChange(this.searchControl.value);
  }

  public onSearchEnter(): void {
    this.onChange(this.searchControl.value);
  }

  private initFormListeners(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(this.debounceTime),
        switchMap((text: string) => this.youtubeService.searchVideoResults({ query: text })),
        takeUntil(this.onDestroy$)
      )
      .subscribe((results: IYoutubeSearchResult[]) => {
        this.searchOptions = results;
        this.cdr.detectChanges();
      });
  }
}