import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsletterSubscriber } from './newsletter-subscriber.entity';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectRepository(NewsletterSubscriber)
    private subscribersRepo: Repository<NewsletterSubscriber>,
  ) {}

  async subscribe(email: string) {
    const existing = await this.subscribersRepo.findOne({ where: { email } });
    if (existing) throw new ConflictException('Email already subscribed');
    const subscriber = this.subscribersRepo.create({ email });
    await this.subscribersRepo.save(subscriber);
    return { message: 'Successfully subscribed' };
  }
}
