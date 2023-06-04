import { Order } from "@@core/domain/entities/order";
import { Product } from "@@core/domain/entities/product";
import { CartGateway } from "@@core/domain/gateways/cart.gateway";
import { OrderGateway } from "@@core/domain/gateways/order.gateway";

export class ProcessOrderUseCase {
  constructor(private orderGate: OrderGateway, private cartGateway: CartGateway) {}

  public async execute({
    products,
    credit_card_number,
  }: {
    products: Product[];
    credit_card_number: string;
  }) {
    const order = new Order({
      products,
      credit_card_number,
    });
    const newOrder = await this.orderGate.insert(order);
    const cart = this.cartGateway.get();

    cart.clear();
    this.cartGateway.save(cart);
    
    return newOrder;
  }
}