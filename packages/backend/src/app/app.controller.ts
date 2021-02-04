import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('storage')
  @Get('storage/:file')
  getStorageFile(@Res() res, @Param('file') file: string) {
    this.appService.serveFile(res, file);
  }
}
