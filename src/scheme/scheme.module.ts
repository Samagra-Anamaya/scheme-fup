import { Module } from '@nestjs/common';
import { SchemeController } from './scheme.controller';
import { SchemeService } from './scheme.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SchemeController],
  providers: [SchemeService]
})
export class SchemeModule {}
