"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let MoviesService = class MoviesService {
    tmdbApiKey = process.env.TMDB_API_KEY;
    tmdbApiUrl = "https://api.themoviedb.org/3";
    async findPopularMovies(page = 1) {
        try {
            const response = await axios_1.default.get(`${this.tmdbApiUrl}/movie/popular`, {
                params: {
                    api_key: this.tmdbApiKey,
                    language: "pt-BR",
                    page: page,
                },
            });
            return response.data.results;
        }
        catch (error) {
            console.error("Erro ao buscar filmes populares:", error);
            throw new Error("Falha ao buscar filmes populares do TMDb.");
        }
    }
    async findMoviesByGenre(genreId, page = 1) {
        try {
            const response = await axios_1.default.get(`${this.tmdbApiUrl}/discover/movie`, {
                params: {
                    api_key: this.tmdbApiKey,
                    language: "pt-BR",
                    page: page,
                    with_genres: genreId,
                },
            });
            return response.data.results;
        }
        catch (error) {
            console.error("Erro ao buscar filmes por gênero:", error);
            throw new Error("Falha ao buscar filmes por gênero do TMDb.");
        }
    }
    async findAllGenres() {
        try {
            const response = await axios_1.default.get(`${this.tmdbApiUrl}/genre/movie/list`, {
                params: {
                    api_key: this.tmdbApiKey,
                    language: "pt-BR",
                },
            });
            return response.data.genres;
        }
        catch (error) {
            console.error("Erro ao buscar gêneros:", error);
            throw new Error("Falha ao buscar gêneros do TMDb.");
        }
    }
    async searchMovies(query, page = 1) {
        try {
            const response = await axios_1.default.get(`${this.tmdbApiUrl}/search/movie`, {
                params: {
                    api_key: this.tmdbApiKey,
                    language: "pt-BR",
                    page: page,
                    query: query,
                },
            });
            return response.data.results;
        }
        catch (error) {
            console.error("Erro ao buscar filmes por query:", error);
            throw new Error("Falha ao buscar filmes do TMDb.");
        }
    }
    async findMovieById(id) {
        try {
            const [filmeDetalhes, provedores, lancamentos] = await Promise.all([
                axios_1.default.get(`${this.tmdbApiUrl}/movie/${id}`, {
                    params: {
                        api_key: this.tmdbApiKey,
                        language: "pt-BR",
                    },
                }),
                axios_1.default.get(`${this.tmdbApiUrl}/movie/${id}/watch/providers`, {
                    params: {
                        api_key: this.tmdbApiKey,
                    },
                }),
                axios_1.default.get(`${this.tmdbApiUrl}/movie/${id}/release_dates`, {
                    params: {
                        api_key: this.tmdbApiKey,
                    },
                }),
            ]);
            const provedoresBR = provedores.data.results.BR;
            const streaming = provedoresBR?.flatrate || [];
            const aluguel = provedoresBR?.rent || [];
            const compra = provedoresBR?.buy || [];
            const certificacaoBR = lancamentos.data.results
                .find((r) => r.iso_3166_1 === "BR")
                ?.release_dates.find((rd) => rd.certification !== "");
            const filmeCompleto = {
                ...filmeDetalhes.data,
                ondeAssistir: {
                    streaming,
                    aluguel,
                    compra,
                },
                classificacaoEtaria: certificacaoBR?.certification || "N/A",
            };
            return filmeCompleto;
        }
        catch (error) {
            console.error(`Erro ao buscar filme com ID ${id}:`, error);
            throw new Error("Falha ao buscar filme por ID do TMDb.");
        }
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)()
], MoviesService);
//# sourceMappingURL=movies.service.js.map