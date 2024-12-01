import db from '../models/index.js'; // Adjust the path as necessary

// Function to get total patients
export const getTotalPatients = async (req, res) => {
    try {
        const totalPatients = await db.Patient.count();
        res.json({ totalPatients });
    } catch (error) {
        console.error('Error fetching total patients:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to get overdose incidents
export const getOverdoseIncidents = async (req, res) => {
    try {
        const overdoseIncidents = await db.OverdoseIncident.findAll({
            attributes: ['severity', [db.sequelize.fn('COUNT', db.sequelize.col('severity')), 'count']],
            group: ['severity'],
        });
        res.json({ overdoseIncidents });
    } catch (error) {
        console.error('Error fetching overdose incidents:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to get emergency visits
export const getEmergencyVisits = async (req, res) => {
    try {
        const emergencyVisits = await db.EmergencyVisit.count();
        res.json({ emergencyVisits });
    } catch (error) {
        console.error('Error fetching emergency visits:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to get treatment programs
export const getTreatmentPrograms = async (req, res) => {
    try {
        const treatmentPrograms = await db.TreatmentProgram.findAll({
            attributes: ['status', [db.sequelize.fn('COUNT', db.sequelize.col('status')), 'count']],
            group: ['status'],
        });
        res.json({ treatmentPrograms });
    } catch (error) {
        console.error('Error fetching treatment programs:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to get community resources
export const getCommunityResources = async (req, res) => {
    try {
        const communityResources = await db.CommunityResource.count();
        res.json({ communityResources });
    } catch (error) {
        console.error('Error fetching community resources:', error);
        res.status(500).json({ message: 'Server error' });
    }
};