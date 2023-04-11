import React, { useState } from "react";
import Link from "next/link";
import Input from "../../../components/UI/Input";
import Button from "../../../components/UI/Button";

import Layout from "../../../components/Layout";
import { useSession } from "next-auth/react";

interface Workout {
  name: string;
  reps: number | undefined | null;
  sets: number | undefined | null;
  time?: number | undefined | null;
}

export default function index(): JSX.Element {
  //creates a form that can update workouts and add new objects into workout state
  // create state for workouts with name, optional time, reps and sets

  const [workouts, setWorkouts] = useState<Workout[]>([
    { name: "", reps: undefined, sets: undefined, time: undefined },
  ]);

  function handleAddExercise() {
    setWorkouts([
      ...workouts,
      { name: "", reps: undefined, sets: undefined, time: undefined },
    ]);
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
      <h1 className="text-4xl">Create workout</h1>
      <p className="text-lg my-2">Add your workout below</p>
      <Link className="my-2" href="/workouts">
        <Button>Back to workouts</Button>
      </Link>

      <form method="POST" action="/api/workouts">
        {workouts.map((workout, ind) => {
          return (
            <div key={ind}>
              <Input
                label={`Exercise ${ind + 1}`}
                type="text"
                value={workout.name}
                id={"name"}
                name="name"
                placeholder="Eg. Bench Press"
                onChange={(e: any) => handleChange(e, ind)}
              />

              {/* <label htmlFor="name">Name</label> */}
              {/* <input
                onChange={(e) => handleChange(e, ind)}
                type="text"
                name="name"
                id="name"
              /> */}

              <Input
                label={"Reps"}
                type="number"
                value={workout.reps}
                id={"reps"}
                name="reps"
                placeholder="e.g. 10"
                onChange={(e: any) => handleChange(e, ind)}
                min={0}
                max={1000}
              />
              <Input
                label={"Sets"}
                type="number"
                value={workout.sets}
                id={"sets"}
                name="sets"
                placeholder="e.g. 3"
                onChange={(e: any) => handleChange(e, ind)}
                min={0}
                max={1000}
              />
              <Input
                label={"Time (seconds)"}
                type="number"
                value={workout.time}
                id={"time"}
                name="time"
                placeholder="e.g. 30"
                onChange={(e: any) => handleChange(e, ind)}
                min={0}
                max={1000}
                mb="mb-10"
              />

              {/* <input
                onChange={(e) => handleChange(e, ind)}
                type="number"
                name="reps"
                id="reps"
                min={0}
              /> */}
              {/* <label htmlFor="sets">Sets</label>
              <input
                onChange={(e) => handleChange(e, ind)}
                type="number"
                name="sets"
                id="sets"
              /> */}
            </div>
          );
        })}
        <input type="hidden" value={userEmail} name="email" />
        <input type="hidden" value={JSON.stringify(workouts)} name="workout" />
        {/* Buttons that add excercise and submit */}

        <Button onClick={handleAddExercise}>Add exercise</Button>

        <Button type="submit">Submit</Button>
        {/* <button type="button" onClick={handleAddExercise}>
          Add exercise
        </button> */}
      </form>
    </Layout>
  );
}
