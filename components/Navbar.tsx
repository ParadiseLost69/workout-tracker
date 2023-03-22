import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  console.log(useSession());
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const userFirstName = session?.user?.name.split(" ")[0];

  return (
    <div className={styles.navbar}>
      <nav>
        <ul className={styles.navigation}>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/workouts"}>Workouts</Link>
          </li>
          {!session ? (
            <li
              onClick={() => {
                signIn();
              }}
            >
              Sign in
            </li>
          ) : (
            <Link href={"/api/auth/signout"}>
              <li
                onClick={() => {
                  signOut();
                }}
              >
                Sign out
              </li>
            </Link>
          )}
        </ul>
      </nav>
      {session && (
        <div className={styles.user}>
          <p>Welcome back, {userFirstName}!</p>
          <img src={session.user?.image} alt="" />
        </div>
      )}
    </div>
  );
}
