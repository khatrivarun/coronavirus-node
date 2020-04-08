import * as express from "express";
import { DataController } from "../Controllers/DataController";

const route = express.Router();
const controller = new DataController();

route.get("/all", async (req, res) => {
  try {
    const response = await controller.getAll();
    return res.status(200).json({
      Status: "Success",
      Data: response,
    });
  } catch (e) {
    return res.status(500).json({
      Status: "Internal Server Error",
      Error: e,
    });
  }
});

route.get("/country/:country", async (req, res) => {
  try {
    const country = req.params.country.split("-").join(" ");
    const response = await controller.getCountry(country);

    if (response["Required Data"] === undefined) {
      return res.status(404).json({
        Status: "Resource Not Found",
      });
    } else {
      return res.status(200).json({
        Status: "Success",
        Data: response,
      });
    }
  } catch (e) {
    return res.status(500).json({
      Status: "Internal Server Error",
      Error: e,
    });
  }
});

route.get("/total", async (req, res) => {
  try {
    const response = await controller.getTotal();
    return res.status(200).json({
      Status: "Success",
      Data: response,
    });
  } catch (e) {
    return res.status(500).json({
      Status: "Internal Server Error",
      Error: e,
    });
  }
});

export default route;
