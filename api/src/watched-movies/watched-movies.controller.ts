// src/watched-movies/watched-movies.controller.ts
import { 
  Controller, 
  Post, 
  Get, 
  Delete,
  Body, 
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
  Param
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WatchedMoviesService } from './watched-movies.service';

// O DTO para adicionar ou remover um filme
class MovieIdDto {
  movieId: number;
}

@Controller('watched-movies')
@UseGuards(AuthGuard('jwt')) // Protege todas as rotas deste controlador
export class WatchedMoviesController {
  constructor(private readonly watchedMoviesService: WatchedMoviesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addWatchedMovie(@Req() req, @Body() body: MovieIdDto) {
    const userId = req.user.id;
    const movieId = body.movieId;
    return this.watchedMoviesService.addWatchedMovie(userId, movieId);
  }

  @Get()
  async getWatchedMovies(@Req() req) {
    const userId = req.user.id;
    return this.watchedMoviesService.getWatchedMovies(userId);
  }
  

  @Delete()
  @HttpCode(HttpStatus.OK)
  async removeWatchedMovie(@Req() req, @Body() body: MovieIdDto) {
    const userId = req.user.id;
    const movieId = body.movieId;
    return this.watchedMoviesService.removeWatchedMovie(userId, movieId);
  }
  @Get('status/:movieId') // <-- Adiciona a nova rota com um parâmetro
  async checkIfWatched(@Req() req, @Param('movieId') movieId: string): Promise<{ isWatched: boolean }> {
    const userId = req.user.id;
    const isWatched = await this.watchedMoviesService.checkIfWatched(userId, parseInt(movieId, 10));

    return { isWatched };
  }
}