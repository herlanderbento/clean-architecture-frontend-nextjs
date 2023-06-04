import { Product } from "@@core/domain/entities/product";
import { ProductGateway } from "@@core/domain/gateways/product.gateway";
import { AxiosInstance } from "axios";

export class ProductHttpGateway implements ProductGateway {
  public constructor(private http: AxiosInstance) {}

  public async findAll(): Promise<Product[]> {
    return await this.http
      .get<Product[]>(`/products`)
      .then((response) =>
        response.data.map((data: Product) => new Product(data))
      );
  }

  public async findById(id: number): Promise<Product> {
    return await this.http.get<Product>(`/products/${id}`).then((response) => {
      return new Product(response.data);
    });
  }
}
