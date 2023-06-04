import { FormEvent } from "react";

type CheckoutPageProps = {};

export function CheckoutPage(props: CheckoutPageProps) {
  function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  return (
    <div>
      <h3>Meu carrinho</h3>
      <form onSubmit={handleOnSubmit}>
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
