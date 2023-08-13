import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Observable, firstValueFrom, catchError } from 'rxjs';
import { AxiosResponse, AxiosError } from 'axios';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { MoonQuery } from './app.controller';

const SECONDSINADAY = 86400;

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async getMoonData(
    query: MoonQuery,
  ): Promise<Observable<AxiosResponse<JSON>> | JSON> {
    const location = query.location;
    const key = this.configService.get<string>('Q_WEATHER_API_KEY');
    const lang = query.lang;
    const date = query.date;
    const url = `https://devapi.qweather.com/v7/astronomy/moon?location=${location}&date=${date}&lang=${lang}&key=${key}`;
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

      await this.cacheManager.set(cacheKey, data, SECONDSINADAY);

      return data;
    }

    return cachedData;
  }
}
