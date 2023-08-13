import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

export interface MoonQuery {
  lang: string;
  location: string;
  date: string;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('moon')
  async getMoon(@Query() query: MoonQuery) {
    return await this.appService.getMoonData(query);
  }
}
