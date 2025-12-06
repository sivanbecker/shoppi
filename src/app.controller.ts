import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // GET /items
  // GET /items/:id
  // POST /items
  // PUT /items/:id
  // DELETE /items/:id
}
