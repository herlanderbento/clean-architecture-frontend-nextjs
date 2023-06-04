import { GetStaticPaths, GetStaticProps } from "next";
import { http } from "@utils/http";
import { Product } from "@utils/models";

type ProductDetailPageProps = {
  product: Product
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  return (
      <div>
        <h3>{product?.name}</h3>
        <label htmlFor="">Preco</label> {product?.price}
        <button>Adicionar no carrinho</button>
      </div>
    )
}

export default ProductDetailPage

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params || {};
  const { data: product } = await http.get(`products/${id}`);

  return {
    props: {
      product,
    },
  };
};
