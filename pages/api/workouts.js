import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("workout-tracker");

    const workouts = await db
      .collection("workouts")
      .find({})
      .limit(10)
      .toArray();

    res.json(workouts);
  } catch (e) {
    console.error(e);
  }
};
