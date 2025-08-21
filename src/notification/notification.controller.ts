import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService, EmailNotifier, SmsNotifier, PushNotifier } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('email')
  sendEmail(@Body('message') message: string) {
    const notifier = new EmailNotifier();
    return this.notificationService.sendNotification(message, notifier);
  }

  @Post('sms')
  sendSms(@Body('message') message: string) {
    const notifier = new SmsNotifier();
    return this.notificationService.sendNotification(message, notifier);
  }

  @Post('push')
  sendPush(@Body('message') message: string) {
    const notifier = new PushNotifier();
    return this.notificationService.sendNotification(message, notifier);
  }
}
