// services/patient.js
import Patient from '../models/Patient.js';

const patientService = {
    savePatient: async (patientData) => {
        try {
            const patient = await Patient.create(patientData);
            return patient;
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return null; // Email already in use
            }
            throw error; // Rethrow unexpected errors
        }
    },
    getAllPatient: async () => {
        return await Patient.findAll();
    }
};

export default patientService;