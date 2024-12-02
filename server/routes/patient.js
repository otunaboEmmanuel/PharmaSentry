// /routes/patient.js
import express from "express";
import { getPatient, createPatient } from "../controllers/patient.js";

const router = express.Router();

router.get("/patient", getPatient);
router.post("/patient", createPatient); // Add this line

export default router;
