import { Cart } from "@@core/domain/entities/cart";
import { CartGateway } from "@@core/domain/gateways/cart.gateway";

export class ClearCartUseCase {
  constructor(private cartGateway: CartGateway) {}

  public execute(): Cart {
    const cart = this.cartGateway.get();

    cart.clear();
    this.cartGateway.save(cart);
    
    return cart;
  }
}
