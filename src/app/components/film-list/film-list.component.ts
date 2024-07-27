import { Component, Input, OnInit } from '@angular/core';
import { Film } from '../../interfaces/Film';
import { FilmComponent } from '../film/film.component';

@Component({
  selector: 'app-film-list',
  templateUrl: 'film-list.component.html',
  standalone: true,
  styleUrls: ['./film-list.component.scss'],
  imports: [FilmComponent]
})

export class FilmListComponent implements OnInit {
  @Input() films: Film[] = [];

  constructor() { }

  ngOnInit() {

  }
}
