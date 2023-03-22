import React from "react";
import Navbar from "./Navbar";

interface props {
  children: any;
}

export default function Layout({ children }: props) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
