// pages/blog/[id].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostPageProps {
  post: Post;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://dummyjson.com/posts?limit=250");
  const data = await res.json();

  const paths = data.posts.map((post: Post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
};

export default function PostPage({ post }: PostPageProps) {
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <article>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <Link href="/">Back to home</Link>
        </article>
      </div>
    </>
  );
}
