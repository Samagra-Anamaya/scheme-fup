import { Test, TestingModule } from '@nestjs/testing';
import { SchemeController } from './scheme.controller';

describe('SchemeController', () => {
  let controller: SchemeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchemeController],
    }).compile();

    controller = module.get<SchemeController>(SchemeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
