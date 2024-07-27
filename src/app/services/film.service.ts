import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataRequest } from '../interfaces/DataRequest';
import { Observable } from 'rxjs';
import { Film } from '../interfaces/Film';

@Injectable({providedIn: 'root'})
export class FilmService {

  private readonly _URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getFilms(request: DataRequest): Observable<Film[]> {
    return this.http.post<Film[]>(this._URL + '/films', request);
  }

}
