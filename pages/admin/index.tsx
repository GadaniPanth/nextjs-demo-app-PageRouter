import Head from "next/head";
import Navbar_admin from "@/components/Navbar_admin";
import { FormEvent, useState } from "react";

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

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   async function Submit() {
  //     // console.log(email);
  //     // console.log(password);

  //     const body = new URLSearchParams();
  //     body.append("email", email);
  //     body.append("password", password);

  //     // const body = JSON.stringify({ email: email, password: password });

  //     // console.log(body);

  //     const res = await fetch(
  //       "http://192.168.1.199/generatic-admin/api/admin_services/login/with_password",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //         body: body.toString(),
  //       }
  //     );

  //     const resData = await res.json();

  //     console.log(resData);
  //   }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    console.log(formData);

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const res = await fetch(
      "http://192.168.1.199/generatic-admin/api/admin_services/login/with_password",
      {
        method: "POST",
        body: formData,
      }
    );

    const resData = await res.json();

    console.log(resData);
  }

  return (
    <>
      <Head>
        <title>Admin Panel</title>
        <meta name="description" content="Blog home with static export" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar_admin />
      <main className="wrapper">
        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" />
        </form>
      </main>
    </>
  );
}
