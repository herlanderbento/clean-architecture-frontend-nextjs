import { CartContext } from "@context/cart.provider";
import { useContext } from "react";

export function MyCart() {
  const cartContext = useContext(CartContext);
  console.log(cartContext.total);
  return (
    <>
      <nav>
        Cart - Total {cartContext.total} | Items {cartContext.products.length}
      </nav>
    </>
  );
}
