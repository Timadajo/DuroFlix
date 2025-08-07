// src/watched-movies/watched-movies.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class WatchedMoviesService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  async addWatchedMovie(userId: number, movieId: number) {
    try {
      const exists = await this.pool.query(
        'SELECT id FROM "WatchedMovie" WHERE "userId" = $1 AND "movieId" = $2',
        [userId, movieId],
      );

      if (exists.rowCount > 0) {
        throw new BadRequestException('Este filme já está na sua lista de assistidos.');
      }

      await this.pool.query(
        'INSERT INTO "WatchedMovie" ("userId", "movieId") VALUES ($1, $2)',
        [userId, movieId],
      );

      return { message: 'Filme adicionado à lista de assistidos com sucesso.' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getWatchedMovies(userId: number) {
    const result = await this.pool.query(
      'SELECT "movieId" FROM "WatchedMovie" WHERE "userId" = $1',
      [userId],
    );

    return result.rows.map(row => row.movieId);
  }
  async checkIfWatched(userId: number, movieId: number): Promise<boolean> {
  const result = await this.pool.query(
    'SELECT id FROM "WatchedMovie" WHERE "userId" = $1 AND "movieId" = $2',
    [userId, movieId],
  );

  return result.rowCount > 0;
}

  async removeWatchedMovie(userId: number, movieId: number) {
    const result = await this.pool.query(
      'DELETE FROM "WatchedMovie" WHERE "userId" = $1 AND "movieId" = $2 RETURNING id',
      [userId, movieId],
    );
    
    if (result.rowCount === 0) {
      throw new NotFoundException('Filme não encontrado na sua lista de assistidos.');
    }

    return { message: 'Filme removido com sucesso.' };
  }
}