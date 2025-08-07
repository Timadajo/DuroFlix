// src/movies/movies.service.ts
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class MoviesService {
  private readonly tmdbApiKey = process.env.TMDB_API_KEY;
  private readonly tmdbApiUrl = "https://api.themoviedb.org/3";

  async findPopularMovies(page: number = 1) {
    try {
      const response = await axios.get(`${this.tmdbApiUrl}/movie/popular`, {
        params: {
          api_key: this.tmdbApiKey,
          language: "pt-BR",
          page: page,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error("Erro ao buscar filmes populares:", error);
      throw new InternalServerErrorException(
        "Falha ao buscar filmes populares do TMDb."
      );
    }
  }

  async findMoviesByGenre(genreId: number, page: number = 1) {
    try {
      const response = await axios.get(`${this.tmdbApiUrl}/discover/movie`, {
        params: {
          api_key: this.tmdbApiKey,
          language: "pt-BR",
          page: page,
          with_genres: genreId,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error("Erro ao buscar filmes por gênero:", error);
      throw new InternalServerErrorException(
        "Falha ao buscar filmes por gênero do TMDb."
      );
    }
  }

  async searchMovies(query: string, page: number = 1) {
    try {
      const response = await axios.get(`${this.tmdbApiUrl}/search/movie`, {
        params: {
          api_key: this.tmdbApiKey,
          language: "pt-BR",
          page: page,
          query: query,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error("Erro ao buscar filmes por query:", error);
      throw new InternalServerErrorException("Falha ao buscar filmes do TMDb.");
    }
  }

  async findAllGenres() {
    try {
      const response = await axios.get(`${this.tmdbApiUrl}/genre/movie/list`, {
        params: {
          api_key: this.tmdbApiKey,
          language: "pt-BR",
        },
      });
      return response.data.genres;
    } catch (error) {
      console.error("Erro ao buscar gêneros:", error);
      throw new InternalServerErrorException(
        "Falha ao buscar gêneros do TMDb."
      );
    }
  }

  async findMovieById(id: number) {
    try {
      const [filmeDetalhes, provedores, lancamentos] = await Promise.all([
        axios.get(`${this.tmdbApiUrl}/movie/${id}`, {
          params: {
            api_key: this.tmdbApiKey,
            language: "pt-BR",
          },
        }),
        axios.get(`${this.tmdbApiUrl}/movie/${id}/watch/providers`, {
          params: {
            api_key: this.tmdbApiKey,
          },
        }),
        axios.get(`${this.tmdbApiUrl}/movie/${id}/release_dates`, {
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
    } catch (error) {
      console.error(`Erro ao buscar filme com ID ${id}:`, error);
      throw new InternalServerErrorException(
        "Falha ao buscar filme por ID do TMDb."
      );
    }
  }

  async advancedFind(query: string, genreId: number, page: number = 1) {
    try {
      const response = await axios.get(`${this.tmdbApiUrl}/search/movie`, {
        params: {
          api_key: this.tmdbApiKey,
          language: "pt-BR",
          page: page,
          query: query,
        },
      });

      const filmesFiltrados = response.data.results.filter((filme) =>
        filme.genre_ids.includes(genreId)
      );

      return filmesFiltrados;
    } catch (error) {
      console.error("Erro na busca avançada de filmes:", error);
      throw new InternalServerErrorException(
        "Falha na busca avançada de filmes do TMDb."
      );
    }
  }
}
