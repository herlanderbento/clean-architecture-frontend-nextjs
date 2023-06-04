import { Order } from "@@core/domain/entities/order";
import { Product } from "@@core/domain/entities/product";
import { OrderGateway } from "@@core/domain/gateways/order.gateway";
import { AxiosInstance } from "axios";

export class OrderHttpGateway implements OrderGateway {
  constructor(private readonly http: AxiosInstance) {}

  public async insert(order: Order): Promise<Order> {
    return this.http.post("/orders", order.toJSON()).then((response) => {
      order.props.id = response.data.id;
      return order;
    });
  }

  public async findById(id: number): Promise<Order> {
    return this.http.get(`/orders/${id}`).then(
      (response) =>
        new Order({
          id: response.data.id,
          products: response.data.products.map(
            (product: Product) => new Product(product)
          ),
          credit_card_number: response.data.credit_card_number,
        })
    );
  }
}
