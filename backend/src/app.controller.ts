import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService) {}

  @Get("get/destinations")
  destinations() {
    return { results: ["away", "home"] }
  }

  @Get("get/players")
  players() {
    return { results: this.appService.getQueryResults("SELECT * FROM inf") };
  }

  @Get("get/teams")
  teams() {
    return { }
  }

  @Get("get/seasons")
  seasons() {
    return { }
  }


  @Get()
  @Render("index.hbs")
  index() { }
}
