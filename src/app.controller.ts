import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

const moonPhaseMap = {
  'First Quarter': 'first-quarter',
  'Waxing Gibbous': 'waxing-gibbous',
  'Full Moon': '',
  'Waning Gibbous': 'waning-gibbous',
  'Third Quarter': 'third-quarter',
  'Waning Crescent': 'waning-crescent',
  'New Moon': 'new',
  'Waxing Crescent': 'waxing-crescent',
};
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
      moonData += `<dt class='font-semibold'>${data[0].replace(
        /_/g,
        ' ',
      )}:</dt><dd class='pl-3'>${data[1]}</dd>`;
    }

    //  @ts-ignore
    const phase: string = moonPhaseMap[moonDataRes.phase_name] ?? '';

    return { moonData, phase };
  }
  @Get('moon')
  async getMoon() {
    return await this.appService.getRapidApiMoonData();
  }
}
