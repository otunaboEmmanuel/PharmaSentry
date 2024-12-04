// models/index.js
import { Sequelize, DataTypes } from 'sequelize';
import Patient from './Patient.js';
import User from './User.js'; // Ensure similar adjustments are made here
import Substance from './Substance.js';
import TreatmentProgram from './TreatmentProgram.js';
import TreatmentSession from './TreatmentSession.js';
import OverdoseIncident from './OverdoseIncident.js';

const sequelize = new Sequelize('pharmasentry', 'root', 'otunabo', {
    host: 'localhost',
    dialect: 'mysql',
});

const db = {};

// Define models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Initialize models by passing the sequelize instance
db.User = User(sequelize, DataTypes);
db.Patient = Patient(sequelize, DataTypes);
db.Substance = Substance(sequelize, DataTypes);
db.TreatmentProgram = TreatmentProgram(sequelize, DataTypes);
db.TreatmentSession = TreatmentSession(sequelize, DataTypes);
db.OverdoseIncident = OverdoseIncident(sequelize, DataTypes);

// Define relationships

// Patient and TreatmentSession relationship
db.Patient.hasMany(db.TreatmentSession, { foreignKey: 'PatientID' });
db.TreatmentSession.belongsTo(db.Patient, { foreignKey: 'PatientID' });

// TreatmentProgram and TreatmentSession relationship
db.TreatmentProgram.hasMany(db.TreatmentSession, { foreignKey: 'ProgramID' });
db.TreatmentSession.belongsTo(db.TreatmentProgram, { foreignKey: 'ProgramID' });

// Patient and OverdoseIncident relationship
db.Patient.hasMany(db.OverdoseIncident, { foreignKey: 'PatientID' });
db.OverdoseIncident.belongsTo(db.Patient, { foreignKey: 'PatientID' });

// Substance and OverdoseIncident relationship
db.Substance.hasMany(db.OverdoseIncident, { foreignKey: 'SubstanceID' });
db.OverdoseIncident.belongsTo(db.Substance, { foreignKey: 'SubstanceID' });

export default db;