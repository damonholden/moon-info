import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

const moonPhaseMap: { [key: string]: string } = {
  'First Quarter': 'first-quarter',
  'Waxing Gibbous': 'waxing-gibbous',
  'Full Moon': '',
  'Waning Gibbous': 'waning-gibbous',
  'Third Quarter': 'third-quarter',
  'Waning Crescent': 'waning-crescent',
  'New Moon': 'new',
  'Waxing Crescent': 'waxing-crescent',
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async index(): Promise<{ moonDataHtml: string; phase: string }> {
    const moonDataFetchResponse = await this.appService.fetchMoonData();

    const moonDataHtml = Object.entries(moonDataFetchResponse).reduce(
      (prev, curr) => {
        return `${prev}<dt class='font-semibold'>${curr[0].replace(
          /_/g,
          ' ',
        )}:</dt><dd class='pl-3'>${curr[1]}</dd>`;
      },
      '',
    );

    const phase = moonPhaseMap[moonDataFetchResponse.phase_name];

    return { moonDataHtml, phase };
  }

  @Get('moon-information')
  async moonInformation(): Promise<moonData> {
    return await this.appService.fetchMoonData();
  }
}
