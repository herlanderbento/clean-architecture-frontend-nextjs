import { GetStaticPaths, GetStaticProps } from "next";
import { Registry, container } from "@@core/infra/container-registry";
import { GetProductUseCase } from "@@core/application/product/get-product.use-case";
import { Product, ProductProps } from "@@core/domain/entities/product";
import { useContext } from "react";
import { CartContext } from "@context/cart.provider";

type ProductDetailPageProps = {
  product: ProductProps;
};

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const productEntity = new Product({ ...product });
  const { addProduct } = useContext(CartContext);
  return (
    <div>
      <h3>{productEntity?.name}</h3>
      <label htmlFor="">Preco</label> {productEntity?.price}
      <button onClick={() => addProduct(productEntity)}>Adicionar no carrinho</button>
    </div>
  );
}

export default ProductDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params || {};
  const useCase = container.get<GetProductUseCase>(Registry.GetProductUseCase);
  const product = await useCase.execute(+id!);

  return {
    props: {
      product: product.toJSON(),
    },
  };
};
