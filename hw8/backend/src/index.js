import server from './server' // GraphQL server
import mongo from "./mongo"; // MongoDB connection
// import http from "http";
// import express from "express";
// import WebSocket from "ws";
// import mongoose from "mongoose";
// import dotenv from "dotenv-defaults";
// import { v4 as uuidv4 } from 'uuid';
// import wsConnect from "./wsConnect";

mongo.connect();

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// const db = mongoose.connection;

// db.once("open", () => {
//   console.log("MongoDB connected!");
//   wss.on("connection", (ws) => {
//    console.log("Backend connected!");
//     ws.id = uuidv4()
//     ws.box = "";
//     ws.onmessage = wsConnect.onMessage(wss, ws);
//   });
// });

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
