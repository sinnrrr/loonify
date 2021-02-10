import { Body, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { TypeormService } from '../services/typeorm.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { RequestModificationInterceptor } from '../interceptors/request-modification.interceptor';
import { JwtAccessAuthGuard } from '../../auth/guards/jwt-access-auth.guard';
import { DeleteResult } from 'typeorm';

export class TypeormController<T, C, U> {
  constructor(protected service: TypeormService<T, C, U>) {}

  @Get()
  async findAll(
    @Req() req,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<T>> {
    return this.service.paginate({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<T> {
    return this.service.findOne({ where: { id } });
  }

  @Post()
  @UseGuards(JwtAccessAuthGuard)
  @UseInterceptors(new RequestModificationInterceptor)
  create(@Body() createPostDto: C): Promise<T> {
    return this.service.create(createPostDto);
  }

  @Put(':id')
  @UseGuards(JwtAccessAuthGuard)
  @UseInterceptors(new RequestModificationInterceptor)
  update(@Param('id') id: string, @Body() updatePostDto: U): Promise<T> {
    return this.service.update(+id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAccessAuthGuard)
  @UseInterceptors(new RequestModificationInterceptor)
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.service.remove(+id);
  }
}
