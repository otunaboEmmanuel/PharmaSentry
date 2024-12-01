import express from "express";
import { 
    getTotalPatients, 
    getOverdoseIncidents, 
    getEmergencyVisits, 
    getTreatmentPrograms, 
    getCommunityResources 
} from "../controllers/overview.js";

const router = express.Router();

// Route to get total patients
router.get("/total-patients", getTotalPatients);

// Route to get overdose incidents
router.get("/overdose-incidents", getOverdoseIncidents);

// Route to get emergency visits
router.get("/emergency-visits", getEmergencyVisits);

// Route to get treatment programs
router.get("/treatment-programs", getTreatmentPrograms);

// Route to get community resources
router.get("/community-resources", getCommunityResources);

export default router;