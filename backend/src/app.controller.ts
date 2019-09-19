import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService) {}

  @Get("demo")
  @Render("demo.hbs")
  demo() { 
    return { };
  }

  @Get("doku")
  @Render("doku.hbs")
  doku() {
    return { };
  }
  
  @Get("github")
  @Render("github.hbs")
  github() {
    return { };
  }

  @Get(":x")
  @Render("index.hbs")
  index() {
    return { message: this.appService.getHello() };
  }
}
