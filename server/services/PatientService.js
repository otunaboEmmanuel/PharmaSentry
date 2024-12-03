import db from '../models/index.js'; // Ensure you import the db object

const patientService = {
    savePatient: async (patientData) => {
        try {
            const patient = await db.Patient.create(patientData);
            return patient;
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return null; // Email already in use
            }
            throw error; // Rethrow unexpected errors
        }
    },
    getAllPatients: async () => {
        try {
            const patients = await db.Patient.findAll(); // Fetch all patients using Sequelize
            // Format the DateOfBirth for each patient
            return patients.map(patient => ({
                ...patient.toJSON(), // Convert to plain object
                DateOfBirth: new Date(patient.DateOfBirth).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }),
            }));
        } catch (error) {
            throw error; // Handle any errors
        }
    },
    updatePatient: async (id, updatedData) => {
        const patient = await db.Patient.findByPk(id);
        if (!patient) return null;

        // Update patient fields
        await patient.update(updatedData);
        return patient;
    },

    deletePatient: async (id) => {
        const patient = await db.Patient.findByPk(id);
        if (!patient) return null;

        // Delete the patient
        await patient.destroy();
        return patient;
    },
};

export default patientService;