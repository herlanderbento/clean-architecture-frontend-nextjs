import { Product } from "@@core/domain/entities/product";
import { ProductGateway } from "@@core/domain/gateways/product.gateway";

export class ListProductsUseCase {
  constructor(private _productGateway: ProductGateway) {}

  public async execute(): Promise<Product[]> {
    return await this._productGateway.findAll();
  }
}
