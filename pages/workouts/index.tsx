import React from "react";
import clientPromise from "../../lib/mongodb";
import Layout from "../../components/Layout";
import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import Button from "../../components/UI/Button";
import { format } from "date-fns";

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
      <h1 className="text-4xl my-2 mx-1">Workouts</h1>
      <Link href="/workouts/create">
        <Button>Add Workout</Button>
      </Link>

      {workouts.map((item: any) => {
        //show date
        return (
          <div key={Math.random()} className="my-2 border-b-4 mx-1">
            <h2 className="text-xl font-bold">
              {/* Date is in format like Tuesday, January 1, 2021 */}
              {item.workoutName && item.workoutName}
            </h2>
            <h3 className="text-lg text-gray-400">
              {" "}
              {format(Date.parse(item.date), "EEEE, MMMM d, yyyy")}
            </h3>
            {item.workout.map((ex: any) => {
              // CHANGE THIS KEY
              return (
                <div key={Math.random()} className="my-2">
                  <h3 className="text-lg text-blue-900 font-bold">
                    {ex.weight && ex.weight + " " + "lbs" + " "}
                    {ex.name}
                  </h3>{" "}
                  {ex.reps && <p>Reps: {ex.reps}</p>}
                  {ex.sets && <p>Sets: {ex.sets}</p>}
                  {ex.time && <p>Time: {ex.time} seconds</p>}
                </div>
              );
            })}
          </div>
        );
      })}
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const userEmail = session?.user?.email;
  try {
    const client = await clientPromise;
    const db = client.db("workout-tracker");
    const workouts = await db
      .collection("workouts")
      .find({ email: userEmail })
      .sort({ date: -1 })
      .toArray();

    return {
      props: { workouts: JSON.parse(JSON.stringify(workouts)) },
    };
  } catch (e) {
    console.log(e);
  }
}
