import { Controller, Post, Body } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';

@Controller('report')
export class ReportController {
  constructor(@InjectQueue('report') private reportQueue: Queue) {}

  @Post('monthly')
  async generateMonthlyReport(@Body() body: { month: string; year: string }) {
    const job = await this.reportQueue.add('monthly', body, {

    });
    return { status: 'queued', jobId: job.id };
  }
}
