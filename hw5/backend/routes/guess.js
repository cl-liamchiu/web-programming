import express from "express";
import { getNumber, genNumber } from "../core/getNumber";

const router = express.Router();
const range = { min: 1, max: 100 };

router.post("/start", (_, res) => {
  genNumber(); // ⽤亂數產⽣⼀個猜數字的 number，存在 memory DB
  res.json({ msg: "The game has started." });
  console.log(getNumber());
  range.max = 100;
  range.min = 1;
});

router.get("/guess", (req, res) => {
  const guessNumber = parseInt(req.query.number);
  if (guessNumber > 100 || guessNumber < 1) {
    res.status(406).send({ msg: "Not a legal number." });
  } else if (guessNumber > getNumber()) {
    range.max = Math.min(range.max, guessNumber - 1);
    const computerGuessNumber =
      Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    if (computerGuessNumber > getNumber()) {
      range.max = Math.min(range.max, computerGuessNumber - 1);
      res.status(200).send({
        msg: `Smaller than ${guessNumber} =>
          Computer guesses ${computerGuessNumber} =>
          Smaller than ${computerGuessNumber}`,
        range: `Recommended Guess: ${range.min} to ${range.max}`,
      });
    } else if (computerGuessNumber < getNumber()) {
      range.min = Math.max(range.min, computerGuessNumber + 1);
      res.status(200).send({
        msg: `Smaller than ${guessNumber} =>
          Computer guesses ${computerGuessNumber} =>
          Bigger than ${computerGuessNumber}`,
        range: `Recommended Guess: ${range.min} to ${range.max}`,
      });
    } else if (computerGuessNumber === getNumber()) {
      res.status(200).send({
        msg: `Smaller than ${guessNumber} =>
          Computer guesses ${computerGuessNumber} =>
          Computer WON!!`,
      });
    }
  } else if (guessNumber < getNumber()) {
    range.min = Math.max(range.min, guessNumber + 1);
    const computerGuessNumber =
      Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    if (computerGuessNumber > getNumber()) {
      range.max = Math.min(range.max, computerGuessNumber - 1);
      res.status(200).send({
        msg: `Bigger than ${guessNumber} =>
            Computer guesses ${computerGuessNumber} =>
            Smaller than ${computerGuessNumber}`,
        range: `Recommended Guess: ${range.min} to ${range.max}`,
      });
    } else if (computerGuessNumber < getNumber()) {
      range.min = Math.max(range.min, computerGuessNumber + 1);
      res.status(200).send({
        msg: `Bigger than ${guessNumber} =>
            Computer guesses ${computerGuessNumber} =>
            Bigger than ${computerGuessNumber}`,
        range: `Recommended Guess: ${range.min} to ${range.max}`,
      });
    } else if (computerGuessNumber === getNumber()) {
      res.status(200).send({
        msg: `Bigger than ${guessNumber} =>
            Computer guesses ${computerGuessNumber} =>
            Computer WON!!`,
      });
    }
  } else if (guessNumber === getNumber()) {
    res.status(200).send({ msg: "Equal" });
  } else {
    res.status(406).send({ msg: "Not a legal number." });
  }
  // 去 (memory) DB 拿答案的數字
  // ⽤ req.query.number 拿到前端輸入的數字
  // check if NOT a num or not in range [1,100]
  // 如果有問題 =>
  // res.status(406).send({ msg: 'Not a legal number.' })
  // 如果沒有問題，回傳 status
});

router.post("/restart", (_, res) => {
  genNumber(); // ⽤亂數產⽣⼀個猜數字的 number，存在 memory DB
  res.json({ msg: "The game has restarted." });
  console.log(getNumber());
  range.max = 100;
  range.min = 1;
});

export default router;
