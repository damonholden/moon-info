import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

const MILLISECONDS_IN_A_DAY = 86400000;

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async fetchMoonData(): Promise<moonData> {
    const cacheKey = String(new Date().getDate());

    const cachedMoonData = await this.cacheManager.get<moonData>(cacheKey);

    if (cachedMoonData === undefined) {
      console.log('No cache. Fetching new RapidAPI moon data.');

      const { data: moonData } = await firstValueFrom(
        this.httpService.get<moonData>(
          'https://moon-phase.p.rapidapi.com/basic',
          {
            headers: {
              'X-RapidAPI-Key': this.configService.get<string>('RAPID_API_KEY'),
              'X-RapidAPI-Host': 'moon-phase.p.rapidapi.com',
            },
          },
        ),
      );

      await this.cacheManager.set(cacheKey, moonData, MILLISECONDS_IN_A_DAY);

      return moonData;
    }
    console.log('Using cache for RapidAPI moon data.');

    return cachedMoonData;
  }
}
