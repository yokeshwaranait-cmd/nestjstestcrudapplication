import { Controller, Post, Body } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import { ExcelReport, PDFReport, ReportService } from './reports.service';

@Controller('report')
export class ReportController {
  constructor(@InjectQueue('report') private reportQueue: Queue, private readonly reportService: ReportService) {}

  @Post('monthly')
  async generateMonthlyReport(@Body() body: { month: string; year: string }) {
    const job = await this.reportQueue.add('monthly', body, {

    });
    return { status: 'queued', jobId: job.id };
  }

  @Post('pdf')
  generatePdf(@Body() body: string) {
    const generator = new PDFReport();
    return this.reportService.generateReport(body, generator);
  }

  @Post('excel')
  generateExcel(@Body() body: string) {
    const generator = new ExcelReport();
    return this.reportService.generateReport(body, generator);
  }
}


