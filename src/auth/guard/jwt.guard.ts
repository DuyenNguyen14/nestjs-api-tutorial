import { AuthGuard } from '@nestjs/passport';

// use jwt strategy from jwt.strategy.ts
export class JwtGuard extends AuthGuard('jwt') {}
