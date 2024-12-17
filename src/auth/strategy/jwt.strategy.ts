import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * This class is used to create a JWT strategy for the auth module
 * @see https://docs.nestjs.com/security/authentication
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract the JWT from the request header
      secretOrKey: config.get('JWT_SECRET'), // secret key to verify the JWT
    });
  }

  /**
   * This method is used to validate the JWT
   * @param payload - the decoded JWT
   * @returns the decoded JWT
   */
  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    delete user.hash;

    return user;
  }
}
