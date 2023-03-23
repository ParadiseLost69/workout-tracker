import React from "react";
import Link from "next/link";

import Layout from "../../../components/Layout";
import { useSession } from "next-auth/react";

export default function index(): JSX.Element {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  return (
    <Layout>
      <h1>Create workout</h1>
      //creates a form that sends a post request to /api/workouts
      <form method="POST" action="/api/workouts">
        <label htmlFor="name">Name</label>
        <input name="name" type="text" />
        <label htmlFor="reps">Reps</label>
        <input name="reps" type="number" />
        <label htmlFor="sets">Sets</label>
        <input name="sets" type="number" />
        <input type="hidden" name="email" value={userEmail} />
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
}
