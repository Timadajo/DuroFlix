export declare class MoviesService {
    private readonly tmdbApiKey;
    private readonly tmdbApiUrl;
    findPopularMovies(page?: number): Promise<any>;
    findMoviesByGenre(genreId: number, page?: number): Promise<any>;
    findAllGenres(): Promise<any>;
    searchMovies(query: string, page?: number): Promise<any>;
    findMovieById(id: number): Promise<any>;
}
