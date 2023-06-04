import { FormEvent, useContext } from "react";
import { CartContext } from "@context/cart.provider";
import { http } from "@utils/http";
import { useRouter } from "next/router";
import { Registry, container } from "@@core/infra/container-registry";
import { ProcessOrderUseCase } from "@@core/application/order/process-order.use-case";

type CheckoutPageProps = {};

export function CheckoutPage(props: CheckoutPageProps) {
  const cartContext = useContext(CartContext);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const credit_card_number = event.currentTarget.credit_card_number.value;
    const processOrderUseCase = container.get<ProcessOrderUseCase>(
      Registry.ProcessOrderUseCase
    );

    const order = await processOrderUseCase.execute({
      products: cartContext.cart.products,
      credit_card_number,
    });

    cartContext.reload()

    // const { data: order } = await http.post("orders", {
    //   products: cartContext.cart.products.map((product) => ({
    //     ...product.props,
    //   })),
    //   credit_card_number,
    // });

    router.push(`/checkout/${order.id}/success`);
  }

  return (
    <div>
      <h3>Meu carrinho</h3>
      <ul>
        {cartContext.cart.products.map((product, key) => (
          <li key={key}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="">Cartões de Crédito</label>
          <input
            type="text"
            name="credit_card_number"
            id="credit_card_number"
          />
        </div>
        <div>
          <button type="submit">Comprar</button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutPage;
