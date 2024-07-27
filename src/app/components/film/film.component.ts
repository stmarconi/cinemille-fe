import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Film } from '../../interfaces/Film';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-film',
  templateUrl: 'film.component.html',
  styleUrls: ['./film.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule]
})

export class FilmComponent implements OnChanges {
  @Input() film: Film;

  public screeningsArray: { room: number, date: string }[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['film'] && this.film) {
      this.screeningsArray = Object.entries(this.film.screenings).map(([room, date]) => ({
        room: Number(room),
        date
      }));
    }
  }

  public parseDate(date: string): string {
    const ret = new Date(date);
    return this._leftPad(ret.getDate()) + '/' + this._leftPad(ret.getMonth()+1)
          + ' ' + this._leftPad(ret.getHours()) + ':' + this._leftPad(ret.getMinutes());
  }

  private _leftPad(num: number): string {
    return String(num).padStart(2, '0');
  }
}
