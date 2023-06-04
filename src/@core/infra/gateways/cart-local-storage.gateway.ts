import { injectable } from "inversify";
import { Cart } from "@@core/domain/entities/cart";
import { CartGateway } from "@@core/domain/gateways/cart.gateway";
import { Product } from "@@core/domain/entities/product";

@injectable()
export class CartLocalStorageGateway implements CartGateway {
  private readonly CART_KEY = "cart";

  public get(): Cart {
    const products = JSON.parse(localStorage.getItem(this.CART_KEY) || "[]");
    return new Cart({
      products: products.map((product: Product) => new Product(product)),
    });
  }

  public save(cart: Cart): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart.products));
  }
}
