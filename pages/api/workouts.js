import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  if (req.method === "GET") {
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
  }

  if (req.method === "POST") {
    console.log(req.body);
    try {
      const client = await clientPromise;
      const db = client.db("workout-tracker");

      const workout = await db.collection("workouts").insertOne({
        workout: [
          {
            name: req.body.name,
            reps: req.body.reps,
            sets: req.body.sets,
          },
        ],
        email: req.body.email,
      });

      //redirects to workouts page
      res.redirect("/workouts");
    } catch (e) {
      console.error(e);
    }
  }
};
