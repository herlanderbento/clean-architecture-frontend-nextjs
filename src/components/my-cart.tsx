import { useContext } from "react";
import { CartContext } from "@context/cart.provider";

export function MyCart() {
  const { cart } = useContext(CartContext);

  return (
    <>
      <nav>
        Cart - Total {cart.total} | Items {cart.products.length}
      </nav>
    </>
  );
}
