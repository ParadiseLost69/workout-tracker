import React, { useState } from "react";
import Link from "next/link";

import Layout from "../../../components/Layout";
import { useSession } from "next-auth/react";

interface Workout {
  name: string;
  reps: number;
  sets: number;
  time?: number;
}

export default function index(): JSX.Element {
  //creates a form that can update workouts and add new objects into workout state
  const [workouts, setWorkouts] = useState<Workout[]>([
    { name: "", reps: 0, sets: 0 },
  ]);

  function handleAddExercise() {
    setWorkouts([...workouts, { name: "", reps: 0, sets: 0 }]);
  }

  function handleChange(e, ind) {
    const { name, value } = e.target;
    const updatedWorkouts = [...workouts];
    updatedWorkouts[ind][name] = value;
    setWorkouts(updatedWorkouts);
  }
  console.log(workouts);

  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  return (
    <Layout>
      <h1>Create workout</h1>
      <Link href="/workouts">Back to workouts</Link>
      <form method="POST" action="/api/workouts">
        {workouts.map((workout, ind) => {
          return (
            <div key={ind}>
              <label htmlFor="name">Name</label>
              <input
                onChange={(e) => handleChange(e, ind)}
                type="text"
                name="name"
                id="name"
              />
              <label htmlFor="reps">Reps</label>
              <input
                onChange={(e) => handleChange(e, ind)}
                type="number"
                name="reps"
                id="reps"
              />
              <label htmlFor="sets">Sets</label>
              <input
                onChange={(e) => handleChange(e, ind)}
                type="number"
                name="sets"
                id="sets"
              />
            </div>
          );
        })}
        <input type="hidden" value={userEmail} name="email" />
        <input type="hidden" value={JSON.stringify(workouts)} name="workout" />

        <button type="button" onClick={handleAddExercise}>
          Add exercise
        </button>
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
}
