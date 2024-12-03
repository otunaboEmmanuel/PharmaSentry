import db from '../models/index.js'; // Assuming you have a Sequelize instance

const treatmentProgramService = {
    // Save a new treatment program
    saveProgram: async (programData) => {
        const program = await db.TreatmentProgram.create(programData);
        return program;
    },

    // Get all treatment programs, optionally filtered by patientId and programId
    getAllPrograms: async (patientId, programId) => {
        const where = {};
        if (patientId) {
            where.PatientID = patientId;
        }
        if (programId) {
            where.ProgramID = programId;
        }
        const programs = await db.TreatmentProgram.findAll({ where });
        return programs;
    },

    // Update a treatment program by ID
    updateProgram: async (id, updatedData) => {
        const program = await db.TreatmentProgram.findByPk(id);
        if (program) {
            await program.update(updatedData);
            return program;
        }
        return null; // Return null if the program is not found
    },

    // Delete a treatment program by ID
    deleteProgram: async (id) => {
        const program = await db.TreatmentProgram.findByPk(id);
        if (program) {
            await program.destroy();
            return true; // Return true if the program was successfully deleted
        }
        return false; // Return false if the program was not found
    }
};

export default treatmentProgramService;