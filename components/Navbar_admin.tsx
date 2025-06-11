import Link from "next/link";
import styles from "./page.module.css";

export default function Navbar_admin() {
  return (
    <>
      <div className={styles.navbar}>
        <Link href={"/login"}>Login</Link>
        <Link href={"/products"}>Products</Link>
      </div>
    </>
  );
}
