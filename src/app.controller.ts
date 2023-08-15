import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

export interface MoonQuery {
  lang: string;
  location: string;
  date: string;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async root() {
    const moonDataRes = await this.appService.getRapidApiMoonData();

    let moonData = '';

    for (const data of Object.entries(moonDataRes)) {
      moonData += `<li>${data[0].replace(/_/g, ' ')}: ${data[1]}</li>`;
    }

    return { moonData };
  }
  @Get('moon')
  async getMoon() {
    return await this.appService.getRapidApiMoonData();
  }
}
