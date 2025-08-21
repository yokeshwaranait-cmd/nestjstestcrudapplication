// report.service.ts
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';

@Injectable()
export class ReportService {
  constructor(@InjectQueue('report') private reportQueue: Queue) {}

  async generateMonthlyReport(data: { month: string; year: number }) {
    await this.reportQueue.add('monthly', data, {
      attempts: 3,        // Retry if failed
      backoff: 5000,      // Retry after 5 seconds
      removeOnComplete: true,
    });
  }
}
