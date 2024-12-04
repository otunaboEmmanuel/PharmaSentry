import express from 'express';
import OverdoseIncidentService from '../services/OverdoseIncidentService.js';

const router = express.Router();

// Create a new overdose incident
router.post('/', async (req, res) => {
    const incidentData = req.body;

    try {
        const incident = await OverdoseIncidentService.saveIncident(incidentData);
        return res.status(201).json({ message: "Overdose incident successfully saved", incident });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Get all overdose incidents, optionally filtered by patientId and substanceId
router.get('/', async (req, res) => {
    const { patientId, substanceId } = req.query;

    try {
        const incidents = await OverdoseIncidentService.getAllIncidents(patientId, substanceId);
        return res.status(200).json(incidents);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Update an overdose incident by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedIncident = await OverdoseIncidentService.updateIncident(id, updatedData);
        if (updatedIncident) {
            return res.status(200).json({ message: "Overdose incident successfully updated", updatedIncident });
        }
        return res.status(404).json({ message: "Overdose incident not found" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Delete an overdose incident by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await OverdoseIncidentService.deleteIncident(id);
        if (deleted) {
            return res.status(200).json({ message: "Overdose incident successfully deleted" });
        }
        return res.status(404).json({ message: "Overdose incident not found" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;