import express from 'express';
import substanceService from '../services/SubstanceService.js'; // Adjust the import according to your project structure

const router = express.Router();

// Add a new substance
router.post('/', async (req, res) => {
    const substanceData = req.body;

    try {
        const substance = await substanceService.saveSubstance(substanceData);
        return res.status(201).json({ message: "Substance successfully saved", substance });
    } catch (error) {
        return res.status(500).json({ message: "Error saving substance", error: error.message });
    }
});

// Get all substances
router.get('/', async (req, res) => {
    try {
        const substances = await substanceService.getAllSubstances();
        return res.status(200).json(substances);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching substances", error: error.message });
    }
});

// Update a substance by ID
router.put('/:id', async (req, res) => {
    const substanceId = req.params.id;
    const updatedData = req.body;

    try {
        const updatedSubstance = await substanceService.updateSubstance(substanceId, updatedData);
        if (!updatedSubstance) {
            return res.status(404).json({ message: "Substance not found" });
        }
        return res.status(200).json({ message: "Substance successfully updated", updatedSubstance });
    } catch (error) {
        return res.status(500).json({ message: "Error updating substance", error: error.message });
    }
});

// Delete a substance by ID
router.delete('/:id', async (req, res) => {
    const substanceId = req.params.id;

    try {
        const deletedSubstance = await substanceService.deleteSubstance(substanceId);
        if (!deletedSubstance) {
            return res.status(404).json({ message: "Substance not found" });
        }
        return res.status(200).json({ message: "Substance successfully deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting substance", error: error.message });
    }
});

export default router;