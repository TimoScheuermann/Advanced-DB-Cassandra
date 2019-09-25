import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get/destinations')
  destinations() {
    return [
      { destination_id: 0, name: 'Home' },
      { destination_id: 1, name: 'Away' },
    ];
  }

  @Get('get/players')
  async players() {
    return await this.appService.getQueryResults('SELECT * FROM player_info');
  }

  @Get('get/teams')
  async teams() {
    return await this.appService.getQueryResults('SELECT * FROM team_info');
  }

  @Get('get/seasons')
  async seasons() {
    return [
      { season_id: 0, name: '2010/11' },
      { season_id: 1, name: '2011/12' },
      { season_id: 2, name: '2012/13' },
      { season_id: 3, name: '2013/14' },
      { season_id: 4, name: '2014/15' },
      { season_id: 5, name: '2015/16' },
      { season_id: 6, name: '2016/17' },
      { season_id: 7, name: '2017/18' },
      { season_id: 8, name: '2018/19' },
    ];
  }

  @Get('get/gametypes')
  gametypes() {
    return [{ type_id: 0, name: 'Regular' }, { type_id: 1, name: 'Playoffs' }];
  }

  @Get('find/player/:key')
  async findPlayer(@Param('key') key: String) {
    let results = [];
    key = `${key}%`;
    results = [
      ...results,
      await this.appService.getQueryResults(
        'SELECT * FROM player_info WHERE firstname LIKE ?',
        [key],
      ),
    ];
    results = [
      ...results,
      await this.appService.getQueryResults(
        'SELECT * FROM player_info WHERE lastname LIKE ?',
        [key],
      ),
    ];
    return [].concat.apply([], results);
  }

  @Get()
  @Render('index.hbs')
  index() {
    return { foo: 'bar' };
  }
}
