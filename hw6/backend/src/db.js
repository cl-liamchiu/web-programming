import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
// import User from "./models/ScoreCard.js"

export default {
  connect: () => {
    dotenv.config();
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => console.log("mongo db connection created"));

    // const saveUser = async (name,subject,score) => {
    //   const existing = await User.findOne({ name });
    //   if (existing) throw new Error(`data ${name} exists!!`);
    //   try {
    //     const newUser = new User({ name,subject,score });
    //     console.log("Created user", newUser);
    //     return newUser.save();
    //   } catch (e) {
    //     throw new Error("User creation error: " + e);
    //   }
    // };

    // const deleteDB = async () => {
    //   try {
    //     await User.deleteMany({});
    //     console.log("Database deleted");
    //   } catch (e) {
    //     throw new Error("Database deletion failed");
    //   }
    // };

    // const db = mongoose.connection;

    // db.on("error", (err) => console.log(err));
    // db.once("open", async () => {
    //   await deleteDB();
    //   await saveUser("Ric","Math",99);
    // });
  },
};
