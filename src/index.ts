import express from "express";
import * as cron from "node-cron";
import { Data } from "./Utilities/Data";

const app = express();
const data = new Data();
const PORT = process.env.PORT || 3000;

cron.schedule("* * * * *", async () => {
  console.log("running a task every minute");
  await data.cleanData();
});

app.listen(PORT, async () => {
  console.log(`SERVER RUNNING AT PORT ${PORT}`);
  await data.cleanData();
});
