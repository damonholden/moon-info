import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Observable, firstValueFrom, catchError } from 'rxjs';
import { AxiosResponse, AxiosError } from 'axios';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { MoonQuery } from './app.controller';

const MILLISECONDS_IN_A_DAY = 86400000;

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getRapidApiMoonData(): Promise<Observable<AxiosResponse<JSON>> | JSON> {
    const cacheKey = String(new Date().getDate());

    const cachedData = await this.cacheManager.get<JSON>(cacheKey);

    if (cachedData === undefined) {
      console.log('No cache. Fetching new RapidAPI moon data.');
      const { data } = await firstValueFrom(
        this.httpService
          .get('https://moon-phase.p.rapidapi.com/basic', {
            headers: {
              'X-RapidAPI-Key': this.configService.get<string>('RAPID_API_KEY'),
              'X-RapidAPI-Host': 'moon-phase.p.rapidapi.com',
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              console.log(error);
              throw new Error(error.message);
            }),
          ),
      );

      await this.cacheManager.set(cacheKey, data, MILLISECONDS_IN_A_DAY);

      return data;
    }

    console.log('Using cache for RapidAPI moon data.');

    return cachedData;
  }

  async getQDevMoonData(
    query: MoonQuery,
  ): Promise<Observable<AxiosResponse<JSON>> | JSON> {
    const location = query.location;
    const key = this.configService.get<string>('Q_WEATHER_API_KEY');
    const lang = query.lang;
    const date = query.date.replace(/-/g, '');
    const url = `https://devapi.qweather.com/v7/astronomy/moon?location=${location}&date=${date}&lang=${lang}&key=${key}`;
    console.log(url);

    const cacheKey = `${location}-${date}-${lang}`;

    const cachedData = await this.cacheManager.get<JSON>(cacheKey);

    if (cachedData === undefined) {
      const { data } = await firstValueFrom(
        this.httpService.get(url).pipe(
          catchError((error: AxiosError) => {
            console.log(error);
            throw new Error(error.message);
          }),
        ),
      );

      await this.cacheManager.set(cacheKey, data, MILLISECONDS_IN_A_DAY);

      return data;
    }

    return cachedData;
  }
}
