import { Order } from "@@core/domain/entities/order";
import { OrderGateway } from "@@core/domain/gateways/order.gateway";

export class GetOrderUseCase {
  constructor(private orderGate: OrderGateway) {}

  async execute(id: number): Promise<Order> {
    return this.orderGate.findById(id);
  }
}
