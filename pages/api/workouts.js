import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db("workout-tracker");

      const workouts = await db
        .collection("workouts")
        .find({})
        //sorts newest date first
        .sort({ date: -1 })
        .toArray();

      res.json(workouts);
    } catch (e) {
      console.error(e);
    }
  }

  if (req.method === "POST") {
    console.log(req.body);
    try {
      const client = await clientPromise;
      const db = client.db("workout-tracker");

      const workout = await db.collection("workouts").insertOne({
        name: req.body.name,
        email: req.body.email,
        date: new Date(),
        workout: JSON.parse(req.body.workout),
      });

      //redirects to workouts page
      res.redirect("/workouts");
    } catch (e) {
      console.error(e);
    }
  }
};

//Added by copilot
if (req.method === "DELETE") {
  try {
    const client = await clientPromise;
    const db = client.db("workout-tracker");

    const workout = await db.collection("workouts").deleteOne({
      _id: new ObjectId(req.body.id),
    });

    res.json(workout);
  } catch (e) {
    console.error(e);
  }
}
