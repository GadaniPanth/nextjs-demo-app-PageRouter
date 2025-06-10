import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import styles from "@/styles/product.module.css";
import ProductSlider from "@/components/ProductSlider";
import Navbar from "@/components/Navbar";
import Head from "next/head";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
};

// export async function generateStaticParams() {
//   const res = await fetch("https://dummyjson.com/products");
//   const data = await res.json();

//   return data.products.map((product: { id: number }) => ({
//     id: product.id.toString(),
//   }));
// }

// export type Params = Promise<{ id: string }>;

interface ProductPageProps {
  product: Product;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=250");
  const data = await res.json();

  const paths = data.products.map((product: Product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

// export default async function ProductPage({ params }: { params: Params }) {
export default function ProductPage({ product }: ProductPageProps) {
  //   const { id } = await params;

  //   const res = await fetch(`https://dummyjson.com/products/${id}`);
  //   if (!res.ok) throw new Error("Product not found");

  //   const product: Product = await res.json();

  return (
    <>
     <Head>
        <title>Product Details</title>
        <meta name="description" content="Product Details with static export" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.products_wrapper}>
        <ProductSlider images={product.images} title={product.title} />
        <h2 className={styles.product_title}>{product.title}</h2>
        <p className={styles.product_description}>{product.description}</p>
        <p className={styles.product_price}>${product.price}</p>
        <Link href="/products">Back to Products List</Link>
      </div>
    </>
  );
}
