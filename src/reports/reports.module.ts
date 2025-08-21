// report.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ReportProcessor } from './reports.processor';
import { ReportController } from './reports.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'report',
    }),
  ],
  controllers: [ReportController],
  providers: [ReportProcessor],
})
export class ReportModule {}
