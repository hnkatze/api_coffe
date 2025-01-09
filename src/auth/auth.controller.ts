import { Controller, Post, Body, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthType, refreshToken } from './auth.type';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: AuthType })
  async login(@Body() user: AuthType) {
    return this.authService.login(user);
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
