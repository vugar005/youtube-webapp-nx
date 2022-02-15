import { Module } from '@nestjs/common';
import { YoutubeApiModule } from '../youtube/youtube-api.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [YoutubeApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
