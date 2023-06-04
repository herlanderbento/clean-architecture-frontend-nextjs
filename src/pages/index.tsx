import { GetServerSideProps } from "next";
import { http } from "@utils/http";
import { Product } from "@utils/models";
import Link from "next/link";

type HomeProps = {
  products: Product[];
};

export default function Home({ products }: HomeProps) {
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: products } = await http.get("products");

  return {
    props: {
      products,
    },
  };
};
