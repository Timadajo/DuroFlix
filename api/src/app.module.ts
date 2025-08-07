// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { WatchedMoviesModule } from './watched-movies/watched-movies.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MoviesModule,
    DatabaseModule,
    AuthModule,
    WatchedMoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}