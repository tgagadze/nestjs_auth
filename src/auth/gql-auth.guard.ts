import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const token = this.extractTokenFromHeaders(req);
    if (!token) {
      throw new UnauthorizedException('Please provide token');
    }

    try {
      const user = await this.jwtService.verifyAsync(token);
      req.user = {
        email: user.email,
        _id: user._id,
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
