import cors from "cors";
import express from "express";
import db from "./db";
import routes from "./routes";

db.connect();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
