import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  async onModuleInit() {
    try {
      await this.pool.connect();
      console.log('Conexão com o banco de dados estabelecida com sucesso!');
    } catch (error) {
      console.error('Falha na conexão com o banco de dados:', error);
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  getPool() {
    return this.pool;
  }
}
