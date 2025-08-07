import { Test, TestingModule } from '@nestjs/testing';
import { WatchedMoviesController } from './watched-movies.controller';

describe('WatchedMoviesController', () => {
  let controller: WatchedMoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WatchedMoviesController],
    }).compile();

    controller = module.get<WatchedMoviesController>(WatchedMoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
