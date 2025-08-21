import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TasksService {
   private readonly logger = new Logger(TasksService.name);



   @Cron(CronExpression.EVERY_MINUTE)
   handleCron(){
     this.logger.debug('called every minute');
   }

   @Cron('*/5 * * * * *')
   handleCron1() {
    this.logger.debug('Cron job executed every 5 seconds');
  }

    @Timeout(5000)
  initTask() {
    this.logger.log('init task (after 5s)');
  }

    @Interval(60_000)
   repeatTask() {
    this.logger.log('repeat task every 60s (interval-based)');
  }


} 
