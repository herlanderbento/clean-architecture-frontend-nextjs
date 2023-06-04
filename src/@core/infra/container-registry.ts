import "reflect-metadata";
import { Container } from "inversify";
import { http } from "./http";
import { ProductHttpGateway } from "./gateways/products-http.gateway";
import { ListProductsUseCase } from "@@core/application/product/list-products.use-case";
import { GetProductUseCase } from "@@core/application/product/get-product.use-case";
import { CartLocalStorageGateway } from "./gateways/cart-local-storage.gateway";
import { GetCartUseCase } from "@@core/application/cart/get-cart.use-case";
import { ClearCartUseCase } from "@@core/application/cart/clear-cart.use-case";
import { RemoveProductFromCartUseCase } from "@@core/application/cart/remove-product-from-cart.use-case";
import { AddProductInCartUseCase } from "@@core/application/cart/add-product-in-cart.use-case";
import { OrderGateway } from "@@core/domain/gateways/order.gateway";
import { GetOrderUseCase } from "@@core/application/order/get-order.use-case";
import { ProcessOrderUseCase } from "@@core/application/order/process-order.use-case";
import { OrderHttpGateway } from "./gateways/order-http.gateway";

export const Registry = {
  AxiosAdapter: Symbol.for("AxiosAdapter"),

  OrderGateway: Symbol.for("OrderGateway"),
  ProductGateway: Symbol.for("ProductGateway"),
  CartGateway: Symbol.for("CartGateway"),

  ListProductsUseCase: Symbol.for("ListProductsUseCase"),
  GetProductUseCase: Symbol.for("GetProductUseCase"),

  AddProductInCartUseCase: Symbol.for("AddProductInCartUseCase"),
  GetCartUseCase: Symbol.for("GetCartUseCase"),
  ClearCartUseCase: Symbol.for("ClearCartUseCase"),
  RemoveProductFromCartUseCase: Symbol.for("RemoveProductFromCartUseCase"),

  GetOrderUseCase: Symbol.for("GetOrderUseCase"),
  ProcessOrderUseCase: Symbol.for("ProcessOrderUseCase"),
};

export const container = new Container();

// Http
container.bind(Registry.AxiosAdapter).toConstantValue(http);

// Gateways
container.bind(Registry.ProductGateway).toDynamicValue((context) => {
  return new ProductHttpGateway(context.container.get(Registry.AxiosAdapter));
});

container.bind(Registry.OrderGateway).toDynamicValue((context) => {
  return new OrderHttpGateway(context.container.get(Registry.AxiosAdapter));
});

container.bind(Registry.CartGateway).to(CartLocalStorageGateway);

// use cases => Products

container.bind(Registry.ListProductsUseCase).toDynamicValue((context) => {
  return new ListProductsUseCase(
    context.container.get(Registry.ProductGateway)
  );
});

container.bind(Registry.GetProductUseCase).toDynamicValue((context) => {
  return new GetProductUseCase(context.container.get(Registry.ProductGateway));
});

// use cases => Cart

container.bind(Registry.ClearCartUseCase).toDynamicValue((context) => {
  return new ClearCartUseCase(context.container.get(Registry.CartGateway));
});

container.bind(Registry.AddProductInCartUseCase).toDynamicValue((context) => {
  return new AddProductInCartUseCase(
    context.container.get(Registry.CartGateway)
  );
});

container.bind(Registry.GetCartUseCase).toDynamicValue((context) => {
  return new GetCartUseCase(context.container.get(Registry.CartGateway));
});

container
  .bind(Registry.RemoveProductFromCartUseCase)
  .toDynamicValue((context) => {
    return new RemoveProductFromCartUseCase(
      context.container.get(Registry.CartGateway)
    );
  });

container.bind(Registry.GetOrderUseCase).toDynamicValue((context) => {
  const orderGateway = context.container.get<OrderGateway>(Registry.OrderGateway);
  return new GetOrderUseCase(orderGateway);
});
container.bind(Registry.ProcessOrderUseCase).toDynamicValue((context) => {
  return new ProcessOrderUseCase(
    context.container.get(Registry.OrderGateway),
    context.container.get(Registry.CartGateway)
  );
});
