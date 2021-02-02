import { Body, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreatePostDto } from '../../posts/dto/create-post.dto';
import { UpdatePostDto } from '../../posts/dto/update-post.dto';
import { TypeormService } from '../services/typeorm.service';
import { Pagination } from 'nestjs-typeorm-paginate';

export class TypeormController {
  constructor(
    public paginationUrl: string,
    protected service: TypeormService<any, any, any>
  ) {
  }

  @Get()
  async findAll(
    @Req() req,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<any>> {
    limit = limit > 100 ? 100 : limit;
    limit = limit < 0 ? 10 : limit;

    return this.service.paginate({
      page,
      limit,
      route: this.generatePaginationUrlBase(req)
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne({ where: { id } });
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.service.create(createPostDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.service.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  generatePaginationUrlBase(req): string {
    return req.protocol
      + '://'
      + req.get('host')
      + '/'
      + this.paginationUrl
  }
}
