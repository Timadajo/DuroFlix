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
exports.MoviesController = void 0;
const common_1 = require("@nestjs/common");
const movies_service_1 = require("./movies.service");
let MoviesController = class MoviesController {
    moviesService;
    constructor(moviesService) {
        this.moviesService = moviesService;
    }
    async findPopularMovies(page) {
        const pageNumber = parseInt(page, 10) || 1;
        return this.moviesService.findPopularMovies(pageNumber);
    }
    async findGenres() {
        return this.moviesService.findAllGenres();
    }
    async findMoviesByGenre(genreId, page) {
        const pageNumber = parseInt(page, 10) || 1;
        const genreNumber = parseInt(genreId, 10);
        return this.moviesService.findMoviesByGenre(genreNumber, pageNumber);
    }
    async searchMovies(query, page) {
        if (!query) {
            return [];
        }
        const pageNumber = parseInt(page, 10) || 1;
        return this.moviesService.searchMovies(query, pageNumber);
    }
    async advancedFind(query, genreId, page) {
        if (!query || !genreId) {
            throw new common_1.BadRequestException("Os parâmetros 'query' e 'genre' são obrigatórios.");
        }
        const pageNumber = parseInt(page, 10) || 1;
        const genreNumber = parseInt(genreId, 10);
        if (isNaN(genreNumber)) {
            throw new common_1.BadRequestException("O ID do gênero deve ser um número válido.");
        }
        return this.moviesService.advancedFind(query, genreNumber, pageNumber);
    }
    async findMovieById(id) {
        const movieId = parseInt(id, 10);
        return this.moviesService.findMovieById(movieId);
    }
};
exports.MoviesController = MoviesController;
__decorate([
    (0, common_1.Get)("popular"),
    __param(0, (0, common_1.Query)("page")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "findPopularMovies", null);
__decorate([
    (0, common_1.Get)("genres"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "findGenres", null);
__decorate([
    (0, common_1.Get)("genre/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Query)("page")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "findMoviesByGenre", null);
__decorate([
    (0, common_1.Get)("search"),
    __param(0, (0, common_1.Query)("query")),
    __param(1, (0, common_1.Query)("page")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "searchMovies", null);
__decorate([
    (0, common_1.Get)("advanced-find"),
    __param(0, (0, common_1.Query)("query")),
    __param(1, (0, common_1.Query)("genre")),
    __param(2, (0, common_1.Query)("page")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "advancedFind", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "findMovieById", null);
exports.MoviesController = MoviesController = __decorate([
    (0, common_1.Controller)("movies"),
    __metadata("design:paramtypes", [movies_service_1.MoviesService])
], MoviesController);
//# sourceMappingURL=movies.controller.js.map