// controllers/patient.js
import express from 'express';
import patientService from '../services/PatientService.js';

const router = express.Router();

router.post('/add', async (req, res) => {
    const patientData = req.body;
    const patient = await patientService.savePatient(patientData);

    if (!patient) {
        return res.status(200).json({ code: "200", message: "Email already in use" });
    }
    return res.status(200).json({ code: "200", message: "Patient successfully saved" });
});

router.get('/allPatients', async (req, res) => {
    try {
        const patients = await patientService.getAllPatients();
        return res.status(200).json(patients);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching patients", error });
    }
});

export default router;