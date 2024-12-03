import express from 'express';
import treatmentSessionService from '../services/TreatmentService.js';

const router = express.Router();

// Add a new treatment session
router.post('/', async (req, res) => {
    const sessionData = req.body;
    
    try {
        const session = await treatmentSessionService.saveSession(sessionData);
        return res.status(201).json({ message: "Treatment session successfully saved", session });
    } catch (error) {
        return res.status(500).json({ message: "Error saving treatment session", error });
    }
});

// Get all treatment sessions
router.get('/', async (req, res) => {
    const { patientId, programId } = req.query; // Optional query parameters

    try {
        const sessions = await treatmentSessionService.getAllSessions(patientId, programId);
        return res.status(200).json(sessions);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching treatment sessions", error });
    }
});

// Update a treatment session by ID
router.put('/:id', async (req, res) => {
    const sessionId = req.params.id;
    const updatedData = req.body;

    try {
        const updatedSession = await treatmentSessionService.updateSession(sessionId, updatedData);
        if (!updatedSession) {
            return res.status(404).json({ message: "Treatment session not found" });
        }
        return res.status(200).json({ message: "Treatment session successfully updated", updatedSession });
    } catch (error) {
        return res.status(500).json({ message: "Error updating treatment session", error });
    }
});

// Delete a treatment session by ID
router.delete('/:id', async (req, res) => {
    const sessionId = req.params.id;

    try {
        const deletedSession = await treatmentSessionService.deleteSession(sessionId);
        if (!deletedSession) {
            return res.status(404).json({ message: "Treatment session not found" });
        }
        return res.status(200).json({ message: "Treatment session successfully deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting treatment session", error });
    }
});

export default router;