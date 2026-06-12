import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { User, UserRole } from '../users/user.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private ordersRepo: Repository<Order>) {}

  findAll() {
    return this.ordersRepo.find({
      relations: { items: true },
      order: { createdAt: 'DESC' },
    });
  }

  findByUser(userId: string) {
    return this.ordersRepo.find({
      where: { userId },
      relations: { items: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, requestingUser?: User) {
    const order = await this.ordersRepo.findOne({ where: { id }, relations: { items: true } });
    if (!order) throw new NotFoundException('Order not found');

    if (requestingUser && requestingUser.role !== UserRole.ADMIN) {
      if (order.userId !== requestingUser.id) throw new ForbiddenException();
    }

    return order;
  }

  async findBySessionId(sessionId: string) {
    return this.ordersRepo.findOne({
      where: { stripeSessionId: sessionId },
      relations: { items: true },
    });
  }

  async updateStatus(id: string, status: OrderStatus) {
    await this.findOne(id);
    await this.ordersRepo.update(id, { status });
    return this.findOne(id);
  }
}
