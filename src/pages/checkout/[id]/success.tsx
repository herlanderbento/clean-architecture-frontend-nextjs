import { GetStaticPaths, GetStaticProps } from "next";
import { GetOrderUseCase } from "@@core/application/order/get-order.use-case";
import { Registry, container } from "@@core/infra/container-registry";
import { Order } from "@@core/domain/entities/order";

type CheckoutSuccessPageProps = {
  order: Order;
};

export default function CheckoutSuccessPage({
  order,
}: CheckoutSuccessPageProps) {
  return (
    <div>
      <h3>Parabens sua compra ID foi efetivada</h3>
      <ul>
        {order.products.map((product, key) => (
          <li key={key}>
            Producto: {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params || {};
  const useCase = container.get<GetOrderUseCase>(Registry.GetOrderUseCase);
  const order = await useCase.execute(+id!);
  // const { data: order } = await http.get(`/orders/${id}`);
  return {
    props: {
      order: order.toJSON(),
    },
  };
};
