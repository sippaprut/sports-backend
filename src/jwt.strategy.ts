import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './services/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { SECRET_TOKEN } from './configs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_TOKEN
    });
  }

  async validate(payload: JwtPayload, done) {
    const member = await this.authService.validateMember(payload);
    if (!member) {
      return done(new UnauthorizedException(), false);
    }
    done(null, member);
  }
}
