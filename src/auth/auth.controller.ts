import { Controller, Post, Body, Get, HttpException, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthType, refreshToken } from './auth.type';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: AuthType })
  async login(@Body() user: AuthType, @Res() res?: Response) {
    const { accessToken, refreshToken } = await this.authService.login(user);
    return res.cookie('refreshToken', refreshToken, { httpOnly: true, secure:true, path:"/refreshT" }).json({ accessToken });
  }
  @Get('logout')
    async logout() {
        return this.authService.logout();
    }
    @Post('refresh')
    @ApiBody({ type: refreshToken })
    async refresh(@Body('refreshToken') refreshToken: string) {
      if (!refreshToken) {
        throw new HttpException('Refresh token is required', HttpStatus.BAD_REQUEST);
      }
  
      return this.authService.refreshAccessToken(refreshToken);
    }

}
