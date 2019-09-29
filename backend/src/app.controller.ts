import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get/destinations')
  getDestinations() {
    return [
      { destination_id: 0, name: 'Home' },
      { destination_id: 1, name: 'Away' },
    ];
  }

  @Get('get/players')
  async getPlayers() {
    return await this.appService.getQueryResults(
      'SELECT * FROM player_info',
      [],
    );
  }

  @Get('get/teams')
  async getTeams() {
    return await this.appService.getQueryResults('SELECT * FROM team_info', []);
  }

  @Get('get/seasons')
  getSeasons() {
    return [
      { season_id: 20102011 },
      { season_id: 20112012 },
      { season_id: 20122013 },
      { season_id: 20132014 },
      { season_id: 20142015 },
      { season_id: 20152016 },
      { season_id: 20162017 },
      { season_id: 20172018 },
      { season_id: 20182019 },
    ];
  }

  @Get('get/gametypes')
  getGametypes() {
    return [{ type_id: 0, name: 'Regular' }, { type_id: 1, name: 'Playoffs' }];
  }

  @Get('find/player/:key')
  async findPlayer(@Param('key') key: string) {
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

  // ===============================================================
  // All
  // ===============================================================

  @Get('get/goals/total')
  async getGoalsTotal() {
    const goals = await this.appService.getQueryResults(
      'SELECT SUM(goals) AS goals FROM game_teams_stats',
    );
    return goals[0];
  }
  @Get('get/goals/season/:season')
  async getGoalsSeasonTotal(@Param('season') season: number) {
    const gameIDs = Object.values(
      await this.appService.getQueryResults(
        'SELECT game_id FROM game WHERE season=? ALLOW FILTERING',
        [season],
        ['int'],
      ),
    ).map(x => x.game_id);

    const goals = await this.appService.getQueryResults(
      `SELECT SUM(goals) as goals FROM game_teams_stats WHERE game_id IN (${gameIDs.toString()}) ALLOW FILTERING`,
    );
    return goals[0];
  }

  // ===============================================================
  // Team
  // ===============================================================

  @Get('get/goals/team/:team/total')
  async getGoalsTeamTotal(@Param('team') team: number) {
    const goals = await this.appService.getQueryResults(
      'SELECT SUM(goals) as goals FROM game_teams_stats WHERE team_id=? ALLOW FILTERING',
      [team],
      ['int'],
    );
    return goals[0];
  }

  @Get('get/goals/team/:team/home')
  async getGoalsTeamHome(@Param('team') team: number) {
    const goals = await this.appService.getQueryResults(
      "SELECT SUM(goals) as goals FROM game_teams_stats WHERE team_id=? AND HoA='home' ALLOW FILTERING",
      [team],
      ['int'],
    );
    return goals[0];
  }

  @Get('get/goals/team/:team/away')
  async getGoalsTeamAway(@Param('team') team: number) {
    const goals = await this.appService.getQueryResults(
      "SELECT SUM(goals) as goals FROM game_teams_stats WHERE team_id=? AND HoA='away' ALLOW FILTERING",
      [team],
      ['int'],
    );
    return goals[0];
  }

  @Get('get/goals/team/:team/total/:type')
  async getGoalsTeamTotalType(
    @Param('team') team: number,
    @Param('type') type: string,
  ) {
    const away_goals = await this.appService.getQueryResults(
      'SELECT SUM(away_goals) AS goals FROM game WHERE away_team_id=? AND type=? ALLOW FILTERING',
      [team, type],
      ['int', 'text'],
    );
    const home_goals = await this.appService.getQueryResults(
      'SELECT SUM(home_goals) AS goals FROM game WHERE home_team_id=? AND type=? ALLOW FILTERING',
      [team, type],
      ['int', 'text'],
    );
    return { goals: away_goals[0].goals + home_goals[0].goals };
  }

  @Get('get/goals/team/:team/home/:type')
  async getGoalsTeamHomeType(
    @Param('team') team: number,
    @Param('type') type: string,
  ) {
    const goals = await this.appService.getQueryResults(
      'SELECT SUM(home_goals) AS goals FROM game WHERE home_team_id=? AND type=? ALLOW FILTERING',
      [team, type],
      ['int', 'text'],
    );
    return goals[0];
  }

  @Get('get/goals/team/:team/away/:type')
  async getGoalsTeamAwayType(
    @Param('team') team: number,
    @Param('type') type: string,
  ) {
    const goals = await this.appService.getQueryResults(
      'SELECT SUM(away_goals) AS goals FROM game WHERE away_team_id=? AND type=? ALLOW FILTERING',
      [team, type],
      ['int', 'text'],
    );
    return goals[0];
  }

  //

  @Get('get/goals/team/:team/season/:season/total')
  async getGoalsTeamSeasonTotal(
    @Param('team') team: number,
    @Param('season') season: number,
  ) {
    const away_goals = await this.appService.getQueryResults(
      'SELECT SUM(away_goals) AS goals FROM game WHERE away_team_id=? AND season=? ALLOW FILTERING',
      [team, season],
      ['int', 'int'],
    );
    const home_goals = await this.appService.getQueryResults(
      'SELECT SUM(home_goals) AS goals FROM game WHERE home_team_id=? AND season=? ALLOW FILTERING',
      [team, season],
      ['int', 'int'],
    );
    return { goals: away_goals[0].goals + home_goals[0].goals };
  }

  @Get('get/goals/team/:team/season/:season/home')
  async getGoalsTeamSeasonHome(
    @Param('team') team: number,
    @Param('season') season: number,
  ) {
    const goals = await this.appService.getQueryResults(
      'SELECT SUM(home_goals) AS goals FROM game WHERE home_team_id=? AND season=? ALLOW FILTERING',
      [team, season],
      ['int', 'int'],
    );
    return goals[0];
  }

  @Get('get/goals/team/:team/season/:season/away')
  async getGoalsTeamSeasonAway(
    @Param('team') team: number,
    @Param('season') season: number,
  ) {
    const goals = await this.appService.getQueryResults(
      'SELECT SUM(away_goals) AS goals FROM game WHERE away_team_id=? AND season=? ALLOW FILTERING',
      [team, season],
      ['int', 'int'],
    );
    return goals[0];
  }

  @Get('get/goals/team/:team/season/:season/total/:type')
  async getGoalsTeamSeaonsTotalType(
    @Param('team') team: number,
    @Param('season') season: number,
    @Param('type') type: string,
  ) {
    const away_goals = await this.appService.getQueryResults(
      'SELECT SUM(away_goals) AS goals FROM game WHERE away_team_id=? AND season=? AND type=? ALLOW FILTERING',
      [team, season, type],
      ['int', 'int', 'text'],
    );
    const home_goals = await this.appService.getQueryResults(
      'SELECT SUM(home_goals) AS goals FROM game WHERE home_team_id=? AND season=? AND type=? ALLOW FILTERING',
      [team, season, type],
      ['int', 'int', 'text'],
    );
    return { goals: away_goals[0].goals + home_goals[0].goals };
  }
  @Get('get/goals/team/:team/season/:season/home/:type')
  async getGoalsTeamSeasonHomeType(
    @Param('team') team: number,
    @Param('season') season: number,
    @Param('type') type: string,
  ) {
    const goals = await this.appService.getQueryResults(
      'SELECT SUM(home_goals) AS goals FROM game WHERE home_team_id=? AND season=? AND type=? ALLOW FILTERING',
      [team, season, type],
      ['int', 'int', 'text'],
    );
    return goals[0];
  }
  @Get('get/goals/team/:team/season/:season/away/:type')
  async getGoalsTeamSeasonAwayType(
    @Param('team') team: number,
    @Param('season') season: number,
    @Param('type') type: string,
  ) {
    const goals = await this.appService.getQueryResults(
      'SELECT SUM(away_goals) AS goals FROM game WHERE away_team_id=? AND season=? AND type=? ALLOW FILTERING',
      [team, season, type],
      ['int', 'int', 'text'],
    );
    return goals[0];
  }

  // ===============================================================
  // Player
  // ===============================================================

  @Get('get/goals/player/:player/total')
  async getGoalsPlayerTotal(@Param('player') player: number) {
    const goals = await this.appService.getQueryResults(
      'SELECT SUM(goals) AS goals FROM game_skater_stats WHERE player_id=? ALLOW FILTERING',
      [player],
      ['int'],
    );
    return goals[0];
  }

  @Get('get/goals/player/:player/home')
  async getGoalsPlayerHome(@Param('player') player: number) {
    //
    //  1. SELECT team_id, game_id, goals FROM game_skater_stats WHERE player_id = ? AND goals > 0
    //  2. SELECT COUNT(*) AS hits FROM game WHERE team_id == home_team_id AND game_id == game_id
    //  3. If hits == 1 -> map prev. fetched goals
    //     Else map 0
    //  4. Add all up
    //
    const goals = await Object.values(
      await this.appService.getQueryResults(
        'SELECT team_id, game_id, goals FROM game_skater_stats WHERE player_id=? AND goals>0 ALLOW FILTERING',
        [player],
        ['int'],
      ),
    )
      .map(async gskater =>
        (await this.appService.getQueryResults(
          'SELECT COUNT(*) AS hits FROM game WHERE home_team_id=? AND game_id=? ALLOW FILTERING',
          [gskater.team_id, gskater.game_id],
          ['int', 'int'],
        ))[0].hits == 1
          ? gskater.goals
          : 0,
      )
      .reduce(async (a, b) => (await a) + (await b));

    return { goals };
  }

  @Get('get/goals/player/:player/away')
  async getGoalsPlayerAway(@Param('player') player: number) {
    const goals = await Object.values(
      await this.appService.getQueryResults(
        'SELECT team_id, game_id, goals FROM game_skater_stats WHERE player_id=? AND goals>0 ALLOW FILTERING',
        [player],
        ['int'],
      ),
    )
      .map(async gskater =>
        (await this.appService.getQueryResults(
          'SELECT COUNT(*) AS hits FROM game WHERE away_team_id=? AND game_id=? ALLOW FILTERING',
          [gskater.team_id, gskater.game_id],
          ['int', 'int'],
        ))[0].hits == 1
          ? gskater.goals
          : 0,
      )
      .reduce(async (a, b) => (await a) + (await b));

    return { goals };
  }

  @Get('get/goals/player/:player/total/:type')
  async getGoalsPlayerTotalType(
    @Param('player') player: number,
    @Param('type') type: string,
  ) {
    const gameIDs = Object.values(
      await this.appService.getQueryResults(
        'SELECT game_id FROM game WHERE type=? ALLOW FILTERING',
        [type],
        ['text'],
      ),
    ).map(x => x.game_id);

    const goals = this.appService.getQueryResults(
      `SELECT SUM(goals) AS goals FROM game_skater_stats WHERE player_id=? AND game_id IN (${gameIDs.toString()}) ALLOW FILTERING`,
      [player],
      ['int'],
    );
    return goals[0];
  }

  @Get('get/goals/player/:player/home/:type')
  async getGoalsPlayerHomeType(
    @Param('player') player: number,
    @Param('type') type: string,
  ) {
    const goals = await Object.values(
      await this.appService.getQueryResults(
        'SELECT team_id, game_id, goals FROM game_skater_stats WHERE player_id=? AND goals>0 ALLOW FILTERING',
        [player],
        ['int'],
      ),
    )
      .map(async gskater =>
        (await this.appService.getQueryResults(
          'SELECT COUNT(*) AS hits FROM game WHERE home_team_id=? AND game_id=? AND type=? ALLOW FILTERING',
          [gskater.team_id, gskater.game_id, type],
          ['int', 'int', 'text'],
        ))[0].hits == 1
          ? gskater.goals
          : 0,
      )
      .reduce(async (a, b) => (await a) + (await b));

    return { goals };
  }

  @Get('get/goals/player/:player/away/:type')
  async getGoalsPlayerAwayType(
    @Param('player') player: number,
    @Param('type') type: string,
  ) {
    const goals = await Object.values(
      await this.appService.getQueryResults(
        'SELECT team_id, game_id, goals FROM game_skater_stats WHERE player_id=? AND goals>0 ALLOW FILTERING',
        [player],
        ['int'],
      ),
    )
      .map(async gskater =>
        (await this.appService.getQueryResults(
          'SELECT COUNT(*) AS hits FROM game WHERE away_team_id=? AND game_id=? AMD type=? ALLOW FILTERING',
          [gskater.team_id, gskater.game_id, type],
          ['int', 'int', 'text'],
        ))[0].hits == 1
          ? gskater.goals
          : 0,
      )
      .reduce(async (a, b) => (await a) + (await b));

    return { goals };
  }

  //

  @Get('get/goals/player/:player/season/:season/total')
  async getGoalsPlayerSeasonTotal(
    @Param('player') player: number,
    @Param('season') season: number,
  ) {
    const gameIDs = Object.values(
      await this.appService.getQueryResults(
        'SELECT game_id FROM game WHERE season=? ALLOW FILTERING',
        [season],
        ['int'],
      ),
    ).map(x => x.game_id);

    const goals = this.appService.getQueryResults(
      `SELECT SUM(goals) AS goals FROM game_skater_stats WHERE player_id=? AND game_id IN (${gameIDs.toString()}) ALLOW FILTERING`,
      [player],
      ['int'],
    );
    return goals[0];
  }

  @Get('get/goals/player/:player/season/:season/home')
  async getGoalsPlayerSeasonHome(
    @Param('player') player: number,
    @Param('season') season: number,
  ) {
    const goals = await Object.values(
      await this.appService.getQueryResults(
        'SELECT team_id, game_id, goals FROM game_skater_stats WHERE player_id=? AND goals>0 ALLOW FILTERING',
        [player],
        ['int'],
      ),
    )
      .map(async gskater =>
        (await this.appService.getQueryResults(
          'SELECT COUNT(*) AS hits FROM game WHERE home_team_id=? AND game_id=? AND season=? ALLOW FILTERING',
          [gskater.team_id, gskater.game_id, season],
          ['int', 'int', 'int'],
        ))[0].hits == 1
          ? gskater.goals
          : 0,
      )
      .reduce(async (a, b) => (await a) + (await b));

    return { goals };
  }

  @Get('get/goals/player/:player/season/:season/away')
  async getGoalsPlayerSeasonAway(
    @Param('player') player: number,
    @Param('season') season: number,
  ) {
    const goals = await Object.values(
      await this.appService.getQueryResults(
        'SELECT team_id, game_id, goals FROM game_skater_stats WHERE player_id=? AND goals>0 ALLOW FILTERING',
        [player],
        ['int'],
      ),
    )
      .map(async gskater =>
        (await this.appService.getQueryResults(
          'SELECT COUNT(*) AS hits FROM game WHERE away_team_id=? AND game_id=? AND season=? ALLOW FILTERING',
          [gskater.team_id, gskater.game_id, season],
          ['int', 'int', 'season'],
        ))[0].hits == 1
          ? gskater.goals
          : 0,
      )
      .reduce(async (a, b) => (await a) + (await b));

    return { goals };
  }

  @Get('get/goals/player/:player/season/:season/total/:type')
  async getGoalsPlayerSeasonTotalType(
    @Param('player') player: number,
    @Param('season') season: number,
    @Param('type') type: number,
  ) {
    const gameIDs = Object.values(
      await this.appService.getQueryResults(
        'SELECT game_id FROM game WHERE season=? AND type=? ALLOW FILTERING',
        [season, type],
        ['int', 'text'],
      ),
    ).map(x => x.game_id);

    const goals = this.appService.getQueryResults(
      `SELECT SUM(goals) AS goals FROM game_skater_stats WHERE player_id=? AND game_id IN (${gameIDs.toString()}) ALLOW FILTERING`,
      [player],
      ['int'],
    );
    return goals[0];
  }

  @Get('get/goals/player/:player/season/:season/home/:type')
  async getGoalsPlayerSeasonHomeType(
    @Param('player') player: number,
    @Param('season') season: number,
    @Param('type') type: number,
  ) {
    const goals = await Object.values(
      await this.appService.getQueryResults(
        'SELECT team_id, game_id, goals FROM game_skater_stats WHERE player_id=? AND goals>0 ALLOW FILTERING',
        [player],
        ['int'],
      ),
    )
      .map(async gskater =>
        (await this.appService.getQueryResults(
          'SELECT COUNT(*) AS hits FROM game WHERE home_team_id=? AND game_id=? AND season=? AND type=? ALLOW FILTERING',
          [gskater.team_id, gskater.game_id, season, type],
          ['int', 'int', 'int', 'text'],
        ))[0].hits == 1
          ? gskater.goals
          : 0,
      )
      .reduce(async (a, b) => (await a) + (await b));

    return { goals };
  }

  @Get('get/goals/player/:player/season/:season/away/:type')
  async getGoalsPlayerSeasonAwayType(
    @Param('player') player: number,
    @Param('season') season: number,
    @Param('type') type: number,
  ) {
    const goals = await Object.values(
      await this.appService.getQueryResults(
        'SELECT team_id, game_id, goals FROM game_skater_stats WHERE player_id=? AND goals>0 ALLOW FILTERING',
        [player],
        ['int'],
      ),
    )
      .map(async gskater =>
        (await this.appService.getQueryResults(
          'SELECT COUNT(*) AS hits FROM game WHERE away_team_id=? AND game_id=? AND season=? AND type=? ALLOW FILTERING',
          [gskater.team_id, gskater.game_id, season, type],
          ['int', 'int', 'int', 'text'],
        ))[0].hits == 1
          ? gskater.goals
          : 0,
      )
      .reduce(async (a, b) => (await a) + (await b));

    return { goals };
  }

  //

  @Get()
  @Render('index.hbs')
  index() {
    return { foo: 'bar' };
  }
}
