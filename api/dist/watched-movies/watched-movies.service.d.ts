export declare class WatchedMoviesService {
    private pool;
    constructor();
    addWatchedMovie(userId: number, movieId: number): Promise<{
        message: string;
    }>;
    getWatchedMovies(userId: number): Promise<any>;
    checkIfWatched(userId: number, movieId: number): Promise<boolean>;
    removeWatchedMovie(userId: number, movieId: number): Promise<{
        message: string;
    }>;
}
