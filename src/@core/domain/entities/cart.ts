import { Product } from "./product";

export type CartProps = {
  products: Product[];
};

export class Cart {
  constructor(public props: CartProps) {}

  public addProduct(product: Product) {
    this.props.products.push(product);
  }

  public removeProduct(productId: number) {
    this.props.products = this.props.products.filter(
      (product) => product.id !== productId
    );
  }

  public clear() {
    this.props.products = [];
  }

  public get total() {
    return this.props.products.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }

  public get products() {
    return this.props.products;
  }
}
