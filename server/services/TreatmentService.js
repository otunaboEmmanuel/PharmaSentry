import db from '../models/index.js'; // Assuming you have a Sequelize instance

const treatmentSessionService = {
    saveSession: async (sessionData) => {
        const session = await db.TreatmentSession.create(sessionData);
        return session;
    },

    getAllSessions: async (patientId, programId) => {
        const where = {};
        if (patientId) {
            where.PatientID = patientId;
        }
        if (programId) {
            where.ProgramID = programId;
        }
        const sessions = await db.TreatmentSession.findAll({ where });
        return sessions;
    },

    updateSession: async (id, updatedData ) => {
        const session = await db.TreatmentSession.findByPk(id);
        if (session) {
            await session.update(updatedData);
            return session;
        }
        return null;
    },

    deleteSession: async (id) => {
        const session = await db.TreatmentSession.findByPk(id);
        if (session) {
            await session.destroy();
            return true;
        }
        return false;
    }
};

export default treatmentSessionService;