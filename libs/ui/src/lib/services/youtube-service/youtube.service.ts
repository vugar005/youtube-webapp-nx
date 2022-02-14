import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { YoutubeSearchList } from '../../models/youtube-search-list.model';
import { YOUTUBE_API_KEY } from '../../tokens/youtube-api-key.token';
import { YT_BASE_URL } from './youtube-service.constants';

@Injectable({ providedIn: 'root' })
export class YoutubeService {
  constructor(@Inject(YOUTUBE_API_KEY) private apiKey: string, private http: HttpClient) {}

  public searchVideoResults(query: string, maxResults = 5): Observable<YoutubeSearchList> {
    const url = `${YT_BASE_URL}/search?part=snippet&maxResults=${maxResults}&q=${query}&safeSearch=moderate&key=${this.apiKey}`;
    return this.http.get<YoutubeSearchList>(url);
  }

  public getVideoThumbnails() {}
}
