// report.service.ts
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';



// Abstract Report Generator (Abstraction)
abstract class ReportGenerator {
  abstract generate(data: string): string;
}

// Concrete Implementations (Inheritance + Polymorphism)
export class PDFReport extends ReportGenerator {
  generate(data:string): string {
    return `PDF Report generated with data: ${JSON.stringify(data)}`;
  }
}

export class ExcelReport extends ReportGenerator {
  generate(data: string): string {
    return `Excel Report generated with data: ${JSON.stringify(data)}`;
  }
}

@Injectable()
export class ReportsService {
  constructor(@InjectQueue('report') private reportQueue: Queue) {}

  async generateMonthlyReport(data: { month: string; year: number }) {
    await this.reportQueue.add('monthly', data, {
      attempts: 3,        // Retry if failed
      backoff: 5000,      // Retry after 5 seconds
      removeOnComplete: true,
    });
  }
}


@Injectable()
export class ReportService {


  async generateReport(data: string, generator: ReportGenerator){

    return generator.generate(data);
  }
}
