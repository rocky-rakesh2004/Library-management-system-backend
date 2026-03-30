import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';

import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { BlacklistService } from '../../blacklist/blacklist.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private blacklistService: BlacklistService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>(
          'JWT_SECRET',
        ),
      passReqToCallback: true, 
    });
  }

  async validate(req: Request, payload: any) {
    const token =
      req.headers['authorization']?.split(
        ' ',
      )[1];

    if (!token) {
      throw new UnauthorizedException(
        'Token missing',
      );
    }

    const isBlacklisted =
      await this.blacklistService.isBlacklisted(
        token,
      );

    if (isBlacklisted) {
      throw new UnauthorizedException(
        'Token expired or logged out',
      );
    }

    const user =
      await this.usersService.findOne(
        payload.sub,
      );

    if (!user) {
      throw new UnauthorizedException(
        'User not found',
      );
    }

    if (
      user.tokenVersion !==
      payload.tokenVersion
    ) {
      throw new UnauthorizedException(
        'Session expired',
      );
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}