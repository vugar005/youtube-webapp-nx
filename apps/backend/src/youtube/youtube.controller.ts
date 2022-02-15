import { Controller, Get, Param, Query } from '@nestjs/common';
import { YoutubeApiService } from './youtbe-api.service';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeApiService: YoutubeApiService) {}

  @Get('searchVideo')
  async searchVideos(@Query() query) {
    const { q } = query;
    console.log(q);
    const results = await this.youtubeApiService.searchVideoResults(q.trim());
    return results;
  }
}
