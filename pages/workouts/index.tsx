import React from "react";
import clientPromise from "../../lib/mongodb";
import Layout from "../../components/Layout";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface props {
  workouts: any;
}

export default function Workouts({ workouts }: props) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>You don't have access to this!</h1>
        <h2>
          Please
          <span>
            <Link href={"/api/auth/signin"}>Login</Link>
          </span>
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Workouts</h1>
      {workouts.map((item) => {
        return item.workout.map((ex) => {
          // CHANGE THIS KEY
          return (
            <div key={Math.random()}>
              {" "}
              <h3>{ex.name}</h3> <p>Reps: {ex.reps}</p>
              <p>Sets: {ex.sets}</p>
            </div>
          );
        });
      })}
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("workout-tracker");
    const workouts = await db.collection("workouts").find({}).toArray();

    return {
      props: { workouts: JSON.parse(JSON.stringify(workouts)) },
    };
  } catch (e) {
    console.log(e);
  }
}
