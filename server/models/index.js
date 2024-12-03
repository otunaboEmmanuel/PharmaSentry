// models/index.js
import { Sequelize, DataTypes } from 'sequelize';
import Patient from './Patient.js';
import User from './User.js'; // Ensure similar adjustments are made here
import Substance from './Substance.js';
import TreatmentProgram from './TreatmentProgram.js';
import TreatmentSession from './TreatmentSession.js';
import OverdoseIncident from './OverdoseIncident.js';
import EmergencyVisit from './EmergencyVisit.js';
import CommunityResource from './CommunityResource.js';
import Feedback from './Feedback.js';

const sequelize = new Sequelize('pharma_sentry', 'root', '8597', {
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
db.EmergencyVisit = EmergencyVisit(sequelize, DataTypes);
db.CommunityResource = CommunityResource(sequelize, DataTypes);
db.Feedback = Feedback(sequelize, DataTypes);

// Define relationships
db.User.hasMany(db.Patient, { foreignKey: 'UserID' });
db.Patient.belongsTo(db.User, { foreignKey: 'UserID' });

db.Patient.hasMany(db.TreatmentSession, { foreignKey: 'PatientID' });
db.TreatmentSession.belongsTo(db.Patient, { foreignKey: 'PatientID' });

db.TreatmentProgram.hasMany(db.TreatmentSession, { foreignKey: 'ProgramID' });
db.TreatmentSession.belongsTo(db.TreatmentProgram, { foreignKey: 'ProgramID' });

db.Patient.hasMany(db.OverdoseIncident, { foreignKey: 'PatientID' });
db.OverdoseIncident.belongsTo(db.Patient, { foreignKey: 'PatientID' });

db.Substance.hasMany(db.OverdoseIncident, { foreignKey: 'SubstanceID' });
db.OverdoseIncident.belongsTo(db.Substance, { foreignKey: 'SubstanceID' });

db.Patient.hasMany(db.EmergencyVisit, { foreignKey: 'PatientID' });
db.EmergencyVisit.belongsTo(db.Patient, { foreignKey: 'PatientID' });

db.CommunityResource.belongsToMany(db.Patient, { through: 'PatientResources' });
db.Patient.belongsToMany(db.CommunityResource, { through: 'PatientResources' });

db.User.hasMany(db.Feedback, { foreignKey: 'User  ID' });
db.Feedback.belongsTo(db.User, { foreignKey: 'User  ID' });

// Export the db object
export default db;