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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchedMoviesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const watched_movies_service_1 = require("./watched-movies.service");
class MovieIdDto {
    movieId;
}
let WatchedMoviesController = class WatchedMoviesController {
    watchedMoviesService;
    constructor(watchedMoviesService) {
        this.watchedMoviesService = watchedMoviesService;
    }
    async addWatchedMovie(req, body) {
        const userId = req.user.id;
        const movieId = body.movieId;
        return this.watchedMoviesService.addWatchedMovie(userId, movieId);
    }
    async getWatchedMovies(req) {
        const userId = req.user.id;
        return this.watchedMoviesService.getWatchedMovies(userId);
    }
    async removeWatchedMovie(req, body) {
        const userId = req.user.id;
        const movieId = body.movieId;
        return this.watchedMoviesService.removeWatchedMovie(userId, movieId);
    }
    async checkIfWatched(req, movieId) {
        const userId = req.user.id;
        const isWatched = await this.watchedMoviesService.checkIfWatched(userId, parseInt(movieId, 10));
        return { isWatched };
    }
};
exports.WatchedMoviesController = WatchedMoviesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, MovieIdDto]),
    __metadata("design:returntype", Promise)
], WatchedMoviesController.prototype, "addWatchedMovie", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WatchedMoviesController.prototype, "getWatchedMovies", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, MovieIdDto]),
    __metadata("design:returntype", Promise)
], WatchedMoviesController.prototype, "removeWatchedMovie", null);
__decorate([
    (0, common_1.Get)('status/:movieId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('movieId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WatchedMoviesController.prototype, "checkIfWatched", null);
exports.WatchedMoviesController = WatchedMoviesController = __decorate([
    (0, common_1.Controller)('watched-movies'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [watched_movies_service_1.WatchedMoviesService])
], WatchedMoviesController);
//# sourceMappingURL=watched-movies.controller.js.map