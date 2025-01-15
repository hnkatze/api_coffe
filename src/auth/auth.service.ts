import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthType } from './auth.type';

@Injectable()
export class AuthService {
  private refreshTokens: Set<string> = new Set();

  constructor(private jwtService: JwtService) {}

  /**
   * Inicia sesión y emite access y refresh tokens
   * @param user Objeto con información del usuario
   * @returns Object con accessToken y refreshToken
   */
  async login(user: AuthType) {
    return this.issueTokens(user.userId, user.userName, user.image, user.email);
  }

  /**
   * Cierra sesión (ejemplo básico, personalizar según caso)
   * @returns Mensaje de confirmación de logout
   */
  async logout() {
    return {
      message: 'Logout success',
    };
  }
  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, { secret: process.env.SECRET_KEY });
      return payload;
    } catch {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  /**
   * Genera nuevos access tokens usando un refresh token válido
   * @param refreshToken Refresh token enviado por el cliente
   * @returns Object con un nuevo accessToken
   */
  async refreshAccessToken(refreshToken: string) {
    if (!this.refreshTokens.has(refreshToken)) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }

    try {
      const payload = this.jwtService.verify(refreshToken, { secret: 'refresh-secret' });
      const newAccessToken = this.jwtService.sign(
        { userId: payload.userId },
        { secret: 'access-secret', expiresIn: '15m' },
      );

      return { accessToken: newAccessToken };
    } catch {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
  }

  /**
   * Emite un par de tokens: access y refresh
   * @param userId ID del usuario
   * @param username Nombre del usuario (opcional)
   * @returns Object con accessToken y refreshToken
   */
  private issueTokens(userId: string, userName?: string, image?: string, email?: string) {
    const payload = { userId, userName,image,email };
    const accessToken = this.jwtService.sign(payload, { secret: process.env.SECRET_KEY, expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { secret: process.env.SECRET_KEY, expiresIn: '7d' });

    // Almacena el refresh token para validación futura
    this.refreshTokens.add(refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }
}
