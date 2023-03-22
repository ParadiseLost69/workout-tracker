import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("workout-tracker");

    const workout = await db
      .collection("workouts")
      .find({ _id: ObjectId("6418c81a044d3314c1ae6642") })
      .toArray();

    res.json(workout);
  } catch (e) {
    console.error(e);
  }
};
