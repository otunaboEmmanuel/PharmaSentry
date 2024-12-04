import db from '../models/index.js'; // Adjust the import according to your project structure

const OverdoseIncidentService = {
    // Save a new overdose incident
    saveIncident: async (incidentData) => {
        try {
            const incident = await db.OverdoseIncident.create(incidentData);
            return incident;
        } catch (error) {
            throw new Error('Error saving overdose incident: ' + error.message);
        }
    },

    // Get all overdose incidents, optionally filtered by patientId and substanceId
    getAllIncidents: async (patientId, substanceId) => {
        const where = {};
        if (patientId) {
            where.PatientID = patientId;
        }
        if (substanceId) {
            where.SubstanceID = substanceId;
        }
        try {
            const incidents = await db.OverdoseIncident.findAll({ where });
            return incidents;
        } catch (error) {
            throw new Error('Error fetching overdose incidents: ' + error.message);
        }
    },

    // Update an overdose incident by ID
    updateIncident: async (id, updatedData) => {
        try {
            const incident = await db.OverdoseIncident.findByPk(id);
            if (incident) {
                await incident.update(updatedData);
                return incident;
            }
            return null; // Return null if the incident is not found
        } catch (error) {
            throw new Error('Error updating overdose incident: ' + error.message);
        }
    },

    // Delete an overdose incident by ID
    deleteIncident: async (id) => {
        try {
            const incident = await db.OverdoseIncident.findByPk(id);
            if (incident) {
                await incident.destroy();
                return true; // Return true if the incident was successfully deleted
            }
            return false; // Return false if the incident was not found
        } catch (error) {
            throw new Error('Error deleting overdose incident: ' + error.message);
        }
    }
};

export default OverdoseIncidentService;