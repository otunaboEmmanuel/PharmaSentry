import express from 'express';
import treatmentProgramService from '../services/TreatmentProgramService.js'; // Adjust the import according to your project structure

const router = express.Router();

// Add a new treatment program
router.post('/', async (req, res) => {
    const programData = req.body;
    
    try {
        const program = await treatmentProgramService.saveProgram(programData);
        return res.status(201).json({ message: "Treatment program successfully saved", program });
    } catch (error) {
        return res.status(500).json({ message: "Error saving treatment program", error });
    }
});

// Get all treatment programs
router.get('/', async (req, res) => {
    const { patientId, programId } = req.query; // Optional query parameters

    try {
        const programs = await treatmentProgramService.getAllPrograms(patientId, programId);
        return res.status(200).json(programs);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching treatment programs", error });
    }
});

// Update a treatment program by ID
router.put('/:id', async (req, res) => {
    const programId = req.params.id;
    const updatedData = req.body;

    try {
        const updatedProgram = await treatmentProgramService.updateProgram(programId, updatedData);
        if (!updatedProgram) {
            return res.status(404).json({ message: "Treatment program not found" });
        }
        return res.status(200).json({ message: "Treatment program successfully updated", updatedProgram });
    } catch (error) {
        return res.status(500).json({ message: "Error updating treatment program", error });
    }
});

// Delete a treatment program by ID
router.delete('/:id', async (req, res) => {
    const programId = req.params.id;

    try {
        const deletedProgram = await treatmentProgramService.deleteProgram(programId);
        if (!deletedProgram) {
            return res.status(404).json({ message: "Treatment program not found" });
        }
        return res.status(200).json({ message: "Treatment program successfully deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting treatment program", error });
    }
});

export default router;