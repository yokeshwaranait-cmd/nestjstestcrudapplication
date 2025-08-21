// report.processor.ts
import { Processor, Process } from '@nestjs/bull';
import type { Job } from 'bull';
import { Injectable } from '@nestjs/common';

@Processor('report')
@Injectable()
export class ReportProcessor {
  @Process('monthly')
  async handleMonthlyReport(job: Job<{ month: string; year: number }>) {
    console.log('Generating report for:', job.data);

    const { month, year } = job.data;

    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log(`Report for ${month}/${year} generated successfully!`);
    return { status: 'success', month, year };
  }
}
