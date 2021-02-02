import { Controller, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { PhotosService } from './photos.service';
import { TokenAuthGuard } from '../shared/guards/token-auth.guard';

import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './photos.utils';
import { ApiTags } from '@nestjs/swagger';
import { STORAGE_LOCATION } from '../constants';

@ApiTags('photos')
@Controller('photos')
export class PhotosController {
  constructor(private readonly photoService: PhotosService) {
  }

  @Post('upload/:postId')
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(
    FilesInterceptor('photos', 10, {
      storage: diskStorage({
        filename: editFileName,
        destination: STORAGE_LOCATION }),
      fileFilter: imageFileFilter
    })
  )
  async uploadMultipleFiles(
    @UploadedFiles() files,
    @Param('postId') postId: number
  ) {
    return await this.photoService.uploadImages(files, postId);
  }
}
