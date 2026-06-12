import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private emailService: EmailService) {}

  async send(dto: CreateContactDto) {
    await this.emailService.sendContactMessage(dto.name, dto.email, dto.message);
    return { message: 'Message sent' };
  }
}
