import { Product } from "./product";

export type OrderProps = {
  id?: number;
  products: Product[];
  credit_card_number: string;
};

export class Order {
  constructor(public props: OrderProps) {}

  public get id() {
    return this.props.id;
  }

  public get products() {
    return this.props.products;
  }

  public get credit_card_number() {
    return this.props.credit_card_number;
  }

  public get total() {
    return this.props.products.reduce(
      (total, product) => total + product.price,
      0
    );
  }

  public toJSON() {
    return {
      id: this.id,
      products: this.products.map((product) => product.toJSON()),
      credit_card_number: this.credit_card_number,
    };
  }
}
