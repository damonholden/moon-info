import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule, CacheModule.register()],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should exist', () => {
      expect(appController.root).toBeDefined();
    });

    it('should return string html of li elements each containing moon data', async () => {
      const appControllerRes = await appController.root();

      expect(appControllerRes.moonData).toMatch(
        /<li>phase name: [\s\S]+<\/li><li>stage: [\s\S]+<\/li><li>days until next full moon: [\s\S]+<\/li><li>days until next new moon: [\s\S]+<\/li>/,
      );
    });
  });
});
