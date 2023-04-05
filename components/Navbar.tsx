import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const userFirstName = session?.user?.name.split(" ")[0];

  return (
    <div className="text-lg flex flex-row justify-between w-screen items-center place-self-center">
      <nav>
        <ul className="flex">
          <li className="mx-2">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="mx-2">
            <Link href={"/workouts"}>Workouts</Link>
          </li>
          {!session ? (
            <li
              className="mx-2 hover:cursor-pointer"
              onClick={() => {
                signIn();
              }}
            >
              Sign in
            </li>
          ) : (
            <Link href={"/api/auth/signout"}>
              <li
                className="mx-2"
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
        <div className="flex justify-center items-center">
          <p className="m-2 hidden sm:block text-lg">
            Welcome back, {userFirstName}!
          </p>
          <img
            className="m-2 h-10 w-10 rounded-full"
            src={session.user?.image}
            alt="rounded avatar"
          />
        </div>
      )}
    </div>
  );
}
