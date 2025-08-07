"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchedMoviesService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
let WatchedMoviesService = class WatchedMoviesService {
    pool;
    constructor() {
        this.pool = new pg_1.Pool({
            connectionString: process.env.DATABASE_URL,
        });
    }
    async addWatchedMovie(userId, movieId) {
        try {
            const exists = await this.pool.query('SELECT id FROM "WatchedMovie" WHERE "userId" = $1 AND "movieId" = $2', [userId, movieId]);
            if (exists.rowCount > 0) {
                throw new common_1.BadRequestException('Este filme já está na sua lista de assistidos.');
            }
            await this.pool.query('INSERT INTO "WatchedMovie" ("userId", "movieId") VALUES ($1, $2)', [userId, movieId]);
            return { message: 'Filme adicionado à lista de assistidos com sucesso.' };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getWatchedMovies(userId) {
        const result = await this.pool.query('SELECT "movieId" FROM "WatchedMovie" WHERE "userId" = $1', [userId]);
        return result.rows.map(row => row.movieId);
    }
    async checkIfWatched(userId, movieId) {
        const result = await this.pool.query('SELECT id FROM "WatchedMovie" WHERE "userId" = $1 AND "movieId" = $2', [userId, movieId]);
        return result.rowCount > 0;
    }
    async removeWatchedMovie(userId, movieId) {
        const result = await this.pool.query('DELETE FROM "WatchedMovie" WHERE "userId" = $1 AND "movieId" = $2 RETURNING id', [userId, movieId]);
        if (result.rowCount === 0) {
            throw new common_1.NotFoundException('Filme não encontrado na sua lista de assistidos.');
        }
        return { message: 'Filme removido com sucesso.' };
    }
};
exports.WatchedMoviesService = WatchedMoviesService;
exports.WatchedMoviesService = WatchedMoviesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], WatchedMoviesService);
//# sourceMappingURL=watched-movies.service.js.map