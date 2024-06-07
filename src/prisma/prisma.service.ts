import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect();
      console.info('Initialized and Connected 🎉');
    } catch (error) {
      console.error('Warning: Database connection not established.');
    }
  }

  async onModuleDestroy() {
    console.error('Disconnecting DB');
    await this.$disconnect();
  }
}
