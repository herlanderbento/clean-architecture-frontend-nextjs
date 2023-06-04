export type ProductProps = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export class Product {
  constructor(public props: ProductProps) {}

  public get id(): number {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string {
    return this.props.description;
  }

  public get price(): number {
    return this.props.price;
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
    };
  }
}
