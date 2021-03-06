import { Injectable } from '@nestjs/common';
import { IYoutubeSearchResult } from '@youtube/common-ui';
import * as yt from 'youtube-search-without-api-key';

@Injectable()
export class YoutubeApiService {
  public async searchVideoResults(query: string): Promise<IYoutubeSearchResult[]> {
    const results = await yt.search(query);
    return results;
  }
}
