import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchemeModule } from './scheme/scheme.module';

@Module({
  imports: [SchemeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
