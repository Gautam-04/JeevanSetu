import express from "express";
import { getYearlyReport } from "../controller/report.controller.js";

const router = express.Router();

router.get("/yearly/:year", getYearlyReport);

export default router;