import { Product } from "@@core/domain/entities/product";
import { ProductGateway } from "@@core/domain/gateways/product.gateway";

export class GetProductUseCase {
  public constructor(private productGateway: ProductGateway) {}

  public async execute(id: number): Promise<Product> {
    return this.productGateway.findById(id);
  }
}
