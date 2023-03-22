import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { data: session } = useSession();
  console.log(session);
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
    </div>
  );
}
