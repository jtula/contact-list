import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{provide: AppService, useValue: Model}],
    }).compile();
  });

  
  it('Controller should be defined', () => {
    expect(app).toBeDefined();
  });
 
});