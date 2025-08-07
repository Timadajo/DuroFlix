import { MoviesService } from "./movies.service";
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    findPopularMovies(page: string): Promise<any>;
    findGenres(): Promise<any>;
    findMoviesByGenre(genreId: string, page: string): Promise<any>;
    searchMovies(query: string, page: string): Promise<any>;
    advancedFind(query: string, genreId: string, page: string): Promise<any>;
    findMovieById(id: string): Promise<any>;
}
