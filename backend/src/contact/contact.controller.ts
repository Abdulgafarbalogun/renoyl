import { Controller, Post, Body } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Throttle({ default: { ttl: 60000, limit: 3 } })
  @Post()
  send(@Body() dto: CreateContactDto) {
    return this.contactService.send(dto);
  }
}
