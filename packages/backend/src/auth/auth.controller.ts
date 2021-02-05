import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get, HttpCode, HttpStatus,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { UpdateUserDto } from "../users/dto/update-user.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAccessAuthGuard } from "./guards/jwt-access-auth.guard";
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
      private readonly authService: AuthService,
      private readonly usersService: UsersService
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get('user')
  @UseGuards(JwtAccessAuthGuard)
  getMe(@Req() req) {
    return req.user
  }

  @Put('user')
  @UseGuards(JwtAccessAuthGuard)
  async updateMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto)
  }

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(@Req() req) {
    return await this.authService.refresh(req.user)
  }

  @Post('logout')
  @UseGuards(JwtAccessAuthGuard)
  async logout(@Req() req) {
    await this.usersService.removeRefreshToken(req.user.id)

    return {}
  }
}
