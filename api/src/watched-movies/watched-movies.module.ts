import { Module } from '@nestjs/common';
import { WatchedMoviesService } from './watched-movies.service';
import { WatchedMoviesController } from './watched-movies.controller';

@Module({
  providers: [WatchedMoviesService],
  controllers: [WatchedMoviesController]
})
export class WatchedMoviesModule {}
