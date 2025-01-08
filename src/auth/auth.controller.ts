import { Controller, Post, Body, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthType } from './auth.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: AuthType) {
    return this.authService.login(user);
  }
  @Get('logout')
    async logout() {
        return this.authService.logout();
    }
    @Post('refresh')
    async refresh(@Body('refreshToken') refreshToken: string) {
      if (!refreshToken) {
        throw new HttpException('Refresh token is required', HttpStatus.BAD_REQUEST);
      }
  
      return this.authService.refreshAccessToken(refreshToken);
    }

}
