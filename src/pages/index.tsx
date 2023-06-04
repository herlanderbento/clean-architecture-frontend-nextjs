import Link from "next/link";
import { GetServerSideProps } from "next";
import { useContext } from "react";
import { ListProductsUseCase } from "@@core/application/product/list-products.use-case";
import { CartContext } from "@context/cart.provider";
import { Registry, container } from "@@core/infra/container-registry";
import { ProductProps } from "@@core/domain/entities/product";

type HomeProps = {
  products: ProductProps[];
};

export default function Home({ products }: HomeProps) {
  const { addProduct } = useContext(CartContext);

  return (
    <div>
      <h1>e-Commerce eBizno</h1>
      <ul>
        {products.map((product, key) => (
          <li key={key}>
            <label htmlFor="">Nome: </label> {product.name}
            <Link href={`products/${product.id}`} passHref>
              <span>ver</span>
            </Link>
            <button onClick={() => addProduct(product)}>
              Adicionar no carrinho
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const useCase = container.get<ListProductsUseCase>(
    Registry.ListProductsUseCase
  );
  const products = await useCase.execute();

  return {
    props: {
      products: products.map((product) => product.toJSON()),
    },
  };
};

// class ListProductsUseCaseFactory {
//   public static create() {
//     const getaway = new ProductHttpGateway(http);
//     return new ListProductsUseCase(getaway);
//   }
// }
