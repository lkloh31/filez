import express from "express";
const app = express();
export default app;

import filesRouter from "#api/files";

app.use(express.json());

app.route("/").get((req, res) => {
  res.send("Welcome to Filez API.");
});

app.use("/", filesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});
