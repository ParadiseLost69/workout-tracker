import React from "react";
import clientPromise from "../../lib/mongodb";

export default function Workouts({ workouts }) {
  console.log(workouts);

  return (
    <div>
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
    </div>
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
