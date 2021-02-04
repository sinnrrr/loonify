import { Body, Controller, Get, Post, Put, Req, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../shared/guards/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { UpdateUserDto } from "../users/dto/update-user.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return req.user
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get('user')
  getMe(@Req() req) {
    return req.user
  }

  @Put('user')
  async updateMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto)
  }
}
