import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { GqlAuthGuard } from './dtos/gql-auth-guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService , AuthResolver, GqlAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
