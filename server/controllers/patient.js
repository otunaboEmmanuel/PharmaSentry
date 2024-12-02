// /controllers/Patient.js
import Patient from "../models/Patient.js"; // Assuming the model is correctly imported

export const getPatient = async (req, res) => {
    try {
        const patients = await Patient.findAll(); // Fetch all patients
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving patients", error });
    }
};

export const createPatient = async (req, res) => {
    try {
        const newPatient = await Patient.create(req.body); // Add new patient
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(500).json({ message: "Error creating patient", error });
    }
};
