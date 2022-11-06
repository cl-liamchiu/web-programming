import { Router } from "express";
import ScoreCard from "../models/ScoreCard";

const router = Router();

const deleteDB = async () => {
  try {
    await ScoreCard.deleteMany({});
    console.log("Database deleted");
  } catch (e) {
    throw new Error("Database deletion failed");
  }
};

const saveUser = async (name, subject, score) => {
  const existing = await ScoreCard.findOne({ name: name, subject: subject });
  try {
    if (existing) {
      console.log(`Updated user {${name}, ${subject}}`);
      existing.score = score;
      return {
        message: `Updating (${name}, ${subject}, ${score})`,
        card: existing.save(),
      };
    } else {
      const newUser = new ScoreCard({ name, subject, score });
      console.log("Created user", newUser);
      return {
        message: `Adding (${name}, ${subject}, ${score})`,
        card: newUser.save(),
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};

const queryUser = async (type, queryString) => {
  try {
    if (type === "name") {
      const users = await ScoreCard.find({ name: queryString });
      if (users.length > 0) {
        console.log(`Query by name:${queryString} \nresult: \n ${users}`);
        const messages = [];
        users.map((user) => {
          messages.push(
            `Found card with name:(${user.name}, ${user.subject}, ${user.score})`
          );
        });
        return {
          messages: messages,
          message: "",
        };
      } else {
        return {
          messages: "",
          message: `${type}(${queryString})not found`,
        };
      }
    } else {
      const users = await ScoreCard.find({ subject: queryString });
      if (users.length > 0) {
        console.log(`Query by subject:${queryString}\nresult: \n ${users}`);
        const messages = [];
        users.map((user) => {
          messages.push(
            `Found card with subject: (${user.name}, ${user.subject}, ${user.score})`
          );
        });
        return {
          messages: messages,
          message: "Found card with subject: (Name, Subject, Score)",
        };
      } else {
        return {
          messages: "",
          message: `${type}(${queryString})not found`,
        };
      }
    }
  } catch (e) {
    return {
      messages: "",
      message: e,
    };
  }
};

router.delete("/cards", async (_, res) => {
  await deleteDB();
  res.json({ message: "Database cleared" });
});

router.post("/card", async (req, res) => {
  const { message: message, card: card } = await saveUser(
    req.body.name,
    req.body.subject,
    req.body.score
  );
  res.json({
    message: message,
    card: card,
  });
});

router.get("/cards", async (req, res) => {
  const { messages: messages, message: message } = await queryUser(
    req.query.type,
    req.query.queryString
  );
  res.json({
    messages,
    message,
  });
});

export default router;
