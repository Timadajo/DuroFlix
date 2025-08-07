import {
  Controller,
  Get,
  Query,
  Param,
  InternalServerErrorException,
  BadRequestException,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get("popular")
  async findPopularMovies(@Query("page") page: string) {
    const pageNumber = parseInt(page, 10) || 1;
    return this.moviesService.findPopularMovies(pageNumber);
  }

  @Get("genres")
  async findGenres() {
    return this.moviesService.findAllGenres();
  }

  @Get("genre/:id")
  async findMoviesByGenre(
    @Param("id") genreId: string,
    @Query("page") page: string
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const genreNumber = parseInt(genreId, 10);
    return this.moviesService.findMoviesByGenre(genreNumber, pageNumber);
  }

  @Get("search")
  async searchMovies(
    @Query("query") query: string,
    @Query("page") page: string
  ) {
    if (!query) {
      return [];
    }
    const pageNumber = parseInt(page, 10) || 1;
    return this.moviesService.searchMovies(query, pageNumber);
  }

  // 👇 Coloque antes de @Get(":id")
  @Get("advanced-find")
  async advancedFind(
    @Query("query") query: string,
    @Query("genre") genreId: string,
    @Query("page") page: string
  ) {
    if (!query || !genreId) {
      throw new BadRequestException(
        "Os parâmetros 'query' e 'genre' são obrigatórios."
      );
    }

    const pageNumber = parseInt(page, 10) || 1;
    const genreNumber = parseInt(genreId, 10);

    if (isNaN(genreNumber)) {
      throw new BadRequestException(
        "O ID do gênero deve ser um número válido."
      );
    }

    return this.moviesService.advancedFind(query, genreNumber, pageNumber);
  }

  @Get(":id")
  async findMovieById(@Param("id") id: string) {
    const movieId = parseInt(id, 10);
    return this.moviesService.findMovieById(movieId);
  }
}
