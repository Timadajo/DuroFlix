import { WatchedMoviesService } from './watched-movies.service';
declare class MovieIdDto {
    movieId: number;
}
export declare class WatchedMoviesController {
    private readonly watchedMoviesService;
    constructor(watchedMoviesService: WatchedMoviesService);
    addWatchedMovie(req: any, body: MovieIdDto): Promise<{
        message: string;
    }>;
    getWatchedMovies(req: any): Promise<any>;
    removeWatchedMovie(req: any, body: MovieIdDto): Promise<{
        message: string;
    }>;
    checkIfWatched(req: any, movieId: string): Promise<{
        isWatched: boolean;
    }>;
}
export {};
