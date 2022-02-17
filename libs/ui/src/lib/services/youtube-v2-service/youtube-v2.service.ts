import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IYoutubeSearchParams, IYoutubeSearchResult, IYoutubeService } from '../../models';

@Injectable({ providedIn: 'root' })
export class YoutubeServiceV2 implements IYoutubeService {
  constructor(private http: HttpClient) {}
  public searchVideoResults(params: IYoutubeSearchParams): Observable<IYoutubeSearchResult[]> {
    const { query } = params;
    const url = `/api/youtube/searchVideo?q=${query}`;
    return this.http.get<IYoutubeSearchResult[]>(url);
  }
}
