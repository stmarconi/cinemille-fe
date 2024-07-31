import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FilmListComponent } from '../film-list/film-list.component';
import { DateAdapter, MAT_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { CustomDateAdapter } from '../../common/date-adapter';
import { DATE_FORMATS } from '../../common/date-format';
import { FilmService } from '../../services/film.service';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { Film } from '../../interfaces/Film';
import { CommonModule } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }
  ],
  imports: [
    FilmListComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    HeaderComponent,
    FormsModule,
    CommonModule,
    MatSlideToggleModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HomeComponent implements OnInit,OnDestroy {

  private _subscription: Subscription = new Subscription();

  public startDate: Date = null;
  public endDate: Date = null;

  public films$: BehaviorSubject<Film[]> = new BehaviorSubject([]);

  public isAdmin: boolean = false;

  constructor(private filmService: FilmService) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
      this._subscription.unsubscribe();
  }

  public onDateChange(): void {
    if (this._isFormValid(this.startDate) && this._isFormValid(this.endDate)) {
      console.log('reload');
      this._subscription.add(
        this.filmService.getFilms({startDate: this._dateToString(this.startDate), endDate: this._dateToString(this.endDate)})
          .subscribe(result => this.films$.next(result))
      );
    }
  }

  private _dateToString(date: Date): string {
    return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
  }

  get minDate(): Date {
    return new Date();
  }

  public handleReset(): void {
    this.films$.next([]);
    this.startDate = null;
    this.endDate = null;
  }

  private _isFormValid(date: Date): boolean {
    return date && (!this.isAdmin ? date > new Date(new Date().getTime() - (24 * 60 * 60 * 1000)) : true);
  }
}
