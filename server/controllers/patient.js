// controllers/patient.js
import express from 'express';
import patientService from '../services/PatientService.js';

const router = express.Router();

// Add a new patient
router.post('/add', async (req, res) => {
    const patientData = req.body;
    const patient = await patientService.savePatient(patientData);

    if (!patient) {
        return res.status(200).json({ code: "200", message: "Email already in use" });
    }
    return res.status(201).json({ code: "201", message: "Patient successfully saved", patient });
});

// Get all patients
router.get('/allPatients', async (req, res) => {
    try {
        const patients = await patientService.getAllPatients();
        return res.status(200).json(patients);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching patients", error });
    }
});

// Update a patient by ID
router.put('/update/:id', async (req, res) => {
    const patientId = req.params.id;
    const updatedData = req.body;

    try {
        const updatedPatient = await patientService.updatePatient(patientId, updatedData);
        if (!updatedPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        return res.status(200).json({ message: "Patient successfully updated", updatedPatient });
    } catch (error) {
        return res.status(500).json({ message: "Error updating patient", error });
    }
});

// Delete a patient by ID
router.delete('/delete/:id', async (req, res) => {
    const patientId = req.params.id;

    try {
        const deletedPatient = await patientService.deletePatient(patientId);
        if (!deletedPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        return res.status(200).json({ message: "Patient successfully deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting patient", error });
    }
});

export default router;