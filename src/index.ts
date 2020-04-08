import express from "express";
import * as cron from "node-cron";
import { Data } from "./Utilities/Data";
import route from "./Routes/routes";

const app = express();
const data = new Data();
const PORT = process.env.PORT || 3000;

cron.schedule("* * * * *", async () => {
  console.log("DATA UPDATED");
  await data.cleanData();
});

app.listen(PORT, async () => {
  console.log(`SERVER RUNNING AT PORT ${PORT}`);
  await data.cleanData();
});

app.use("/", route);
