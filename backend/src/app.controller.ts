import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get/destinations')
  destinations() {
    return {
      results: [
        { destination_id: 0, name: 'Home' },
        { destination_id: 1, name: 'Away' },
      ],
    };
  }

  @Get('get/players')
  async players() {
    return {
      results: await this.appService.getQueryResults(
        'SELECT * FROM player_info',
      ),
    };
  }

  @Get('get/teams')
  async teams() {
    return {
      results: await this.appService.getQueryResults('SELECT * FROM team_info'),
    };
  }

  @Get('get/seasons')
  async seasons() {
    return {
      results: await this.appService.getQueryResults('SELECT * FROM inf'),
    };
  }

  @Get('get/gametypes')
  gametypes() {
    return {
      results: [
        { type_id: 0, name: 'Regular' },
        { type_id: 1, name: 'Playoffs' },
      ],
    };
  }

  @Get('find/player/:key')
  async findPlayer(@Param('key') key: String) {
    return {
      firstnames: await this.appService.getQueryResults(
        'SELECT * FROM player_info WHERE firstname=? ALLOW FILTERING',
        [key],
      ),
      lastnames: await this.appService.getQueryResults(
        'SELECT * FROM player_info WHERE lastname=? ALLOW FILTERING',
        [key],
      ),
    };
  }

  @Get()
  @Render('index.hbs')
  index() {
    return { foo: 'bar' };
  }
}
