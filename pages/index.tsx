import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import Link from "next/link";

import styles from "./Home.module.css";

export async function getServerSideProps(context) {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="container">
      <Head>
        <title>Workout Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {session ? (
          <div>
            <h1>
              Welcome to the website {session.user?.name}. Glad you are back.
            </h1>

            <p>checkout </p>
            <Link href={"/workouts"}>Workouts</Link>
          </div>
        ) : (
          <div>
            <h1>Hello. Please sign in</h1>
            <p>
              checkout
              <Link href={"/workouts"}>Workouts</Link>
            </p>
          </div>
        )}
      </Layout>
    </div>
  );
}
