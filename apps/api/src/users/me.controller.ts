import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { TokenAuthGuard } from '../shared/guards/token-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('me')
@Controller('me')
@UseGuards(TokenAuthGuard)
export class MeController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getMe(@Req() req) {
    return req.user
  }

  @Put()
  async updateMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto)
  }
}
