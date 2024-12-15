import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * The @Global decorator makes this module available to all other modules.
 * Other modules won't have to import this module individually
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
