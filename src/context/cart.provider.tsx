import { Product } from "@utils/models";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  clear: () => void;
  total: number | undefined;
};

export const defaultContext: CartContextType = {
  products: [],
  addProduct: function (product: Product): void {
    throw new Error("Function not implemented.");
  },
  removeProduct: function (product: Product): void {
    throw new Error("Function not implemented.");
  },
  clear: function (): void {
    throw new Error("Function not implemented.");
  },
  total: 0,
};

export const CartContext = createContext(defaultContext);

export function CartProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("products") || "[]"));
  }, []);

  useEffect(() => {
    if (!products) {
      return;
    }
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = useCallback((product: Product) => {
    setProducts((products) => [...products!, product]);
  }, []);

  const removeProduct = useCallback((product: Product) => {
    setProducts((products) =>
      products!.filter((products) => products.id !== product.id)
    );
  }, []);

  const total = useMemo(() => {
    if (!products) {
      return 0;
    }
    products?.reduce((acc, product) => acc + product.price, 0);
  }, [products]);

  const clear = useCallback(() => {
    setProducts([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        products: products || [],
        addProduct,
        removeProduct,
        clear,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
