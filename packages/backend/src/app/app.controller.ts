import { Controller, Get, Param, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { STORAGE_LOCATION } from "../constants";
import { editFileName, imageFileFilter } from "./app.utils";
import { JwtAccessAuthGuard } from "../auth/guards/jwt-access-auth.guard";

@ApiTags('storage')
@Controller('storage')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':file')
  getStorageFile(@Res() res, @Param('file') file: string) {
    this.appService.serveFile(res, file);
  }

  @Post('photos/upload/:postId')
  @UseGuards(JwtAccessAuthGuard)
  @UseInterceptors(
      FilesInterceptor('photos', 10, {
        storage: diskStorage({
          filename: editFileName,
          destination: STORAGE_LOCATION }),
        fileFilter: imageFileFilter
      })
  ) async uploadMultipleFiles(
      @UploadedFiles() files,
      @Param('postId') postId: number
  ) {
    return await this.appService.uploadImages(files, postId);
  }
}
