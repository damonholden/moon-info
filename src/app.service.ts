import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Observable, firstValueFrom, catchError } from 'rxjs';
import { AxiosResponse, AxiosError } from 'axios';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}
  async getMoonData(): Promise<Observable<AxiosResponse<JSON>>> {
    const location = 'BA333';
    const key = this.configService.get<string>('Q_WEATHER_API_KEY');
    const lang = 'en';
    const date = '20230813';
    const url = `https://devapi.qweather.com/v7/astronomy/moon?location=${location}&date=${date}&lang=${lang}&key=${key}`;

    const { data } = await firstValueFrom(
      this.httpService.get(url).pipe(
        catchError((error: AxiosError) => {
          console.log(error);
          throw new Error(error.message);
        }),
      ),
    );

    return data;
  }
}
