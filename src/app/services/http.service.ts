import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGameList(ordering: string, search?: string): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering)

    if (search) { 
      params = new HttpParams().set('ordering', ordering).set('search', search)
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games?key=${env.RAWG_API}`)
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}?key=${env.RAWG_API}`)
    const gameTrailersRequest = this.http.get(`${env.BASE_URL}/games/${id}/movies?key=${env.RAWG_API}`)
    const gameScreenshotsRequest = this.http.get(`${env.BASE_URL}/games/${id}/screenshots?key=${env.RAWG_API}`)

    return forkJoin({
      gameInfoRequest,
      gameTrailersRequest,
      gameScreenshotsRequest
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenShots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results
        }
      })
    )
  }
}
