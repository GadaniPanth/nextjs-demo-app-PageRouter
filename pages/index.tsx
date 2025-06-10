import Head from "next/head";
import Navbar from "@/components/Navbar";
import TagFilter from "@/components/TagFilter";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

type Blog = {
  id: number;
  title: string;
  tags: string[];
};

type Props = {
  tags: string[];
  blogs: Blog[];
};

export async function getStaticProps() {
  const blogRes = await fetch("https://dummyjson.com/posts?limit=250");
  const blogsData = await blogRes.json();
  const blogs = blogsData.posts;

  const tagRes = await fetch("https://dummyjson.com/posts/tag-list");
  const tags = await tagRes.json();

  return {
    props: {
      tags,
      blogs,
    },
  };
}

export default function Home({ tags, blogs }: Props) {
  const router = useRouter();
  const selectedTag = (router.query.tag as string) || "";

  const filteredBlogs = useMemo(() => {
    if (!selectedTag) return blogs;
    return blogs.filter((blog) => blog.tags.includes(selectedTag));
  }, [selectedTag, blogs]);

  return (
    <>
      <Head>
        <title>Static Blog</title>
        <meta name="description" content="Blog home with static export" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <div className="wrapper">
          <h1>My Blog</h1>
          <div className="filter-wrapper">
            <TagFilter tags={tags} selectedTag={selectedTag} />
          </div>
          <ul>
            {filteredBlogs.length > 0 ? (
              filteredBlogs.slice(0, 10).map((blog) => (
                <li key={blog.id}>
                  <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                </li>
              ))
            ) : (
              <li>No posts found!</li>
            )}
          </ul>
        </div>
      </main>
    </>
  );
}
