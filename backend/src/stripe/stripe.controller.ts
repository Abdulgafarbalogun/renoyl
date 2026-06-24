import { Controller, Post, Body, Headers, Req, HttpCode, BadRequestException } from '@nestjs/common';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { StripeService } from './stripe.service';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';

@Controller('stripe')
export class StripeController {
  constructor(
    private stripeService: StripeService,
    private jwtService: JwtService,
  ) {}

  @Post('checkout-session')
  createCheckoutSession(
    @Body() dto: CreateCheckoutSessionDto,
    @Headers('authorization') authHeader?: string,
  ) {
    let userId: string | undefined;
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const payload = this.jwtService.verify(authHeader.split(' ')[1]) as { sub: string };
        userId = payload.sub;
      } catch {
        // invalid / expired token — proceed without linking
      }
    }
    return this.stripeService.createCheckoutSession(dto.items, dto.origin, userId);
  }

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: Request,
  ) {
    if (!signature) throw new BadRequestException('Missing stripe-signature header');
    return this.stripeService.handleWebhook(req['rawBody'] as Buffer, signature);
  }
}
