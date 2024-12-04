import db from '../models/index.js';

const SubstanceService = {
    // Save a new substance
    saveSubstance: async (substanceData) => {
        try {
            const substance = await db.Substance.create(substanceData);
            return substance;
        } catch (error) {
            throw new Error('Error saving substance: ' + error.message);
        }
    },

    // Get all substances
    getAllSubstances: async () => {
        try {
            return await db.Substance.findAll();
        } catch (error) {
            throw new Error('Error fetching substances: ' + error.message);
        }
    },

    // Update a substance by ID
    updateSubstance: async (substanceId, updatedData) => {
        try {
            const [updatedRowCount, updatedRows] = await db.Substance.update(updatedData, {
                where: { SubstanceID: substanceId },
                returning: true,
            });
            return updatedRowCount ? updatedRows[0] // Return the updated substance if found
            : null; // Return null if no substance was updated
        } catch (error) {
            throw new Error('Error updating substance: ' + error.message);
        }
    },

    // Delete a substance by ID
    deleteSubstance: async (substanceId) => {
        try {
            const deletedRowCount = await db.Substance.destroy({
                where: { SubstanceID: substanceId },
            });
            return deletedRowCount > 0; // Return true if a substance was deleted
        } catch (error) {
            throw new Error('Error deleting substance: ' + error.message);
        }
    },
};

export default SubstanceService;