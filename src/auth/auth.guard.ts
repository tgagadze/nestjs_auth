import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeaders(request);
    if (!token) {
      throw new UnauthorizedException('Please provide token');
    }

    try {
      const user = await this.jwtService.verifyAsync(token);
      request.user = {
        email: user.email,
        _id: user._id
      };

    } catch (e) {
      throw new UnauthorizedException('Token is invalid');
    }

    return true;
  }

  extractTokenFromHeaders(req) {
    if (!req.headers.authorization) {
      return null;
    }
    const [type, token] = req.headers['authorization']?.split(' ');
    return token;
  }
}
