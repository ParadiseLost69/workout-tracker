import React from "react";
import Navbar from "./Navbar";

import styles from "../styles/Layout.module.css";

interface props {
  children: any;
}

export default function Layout({ children }: props) {
  return (
    <>
      <Navbar />
      <main className={styles.main}>{children}</main>
    </>
  );
}
