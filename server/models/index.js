import { Sequelize, DataTypes } from "sequelize";
import User from "./User.js"; // Ensure the correct path and filename
import Patient from "./Patient.js"; // Ensure the correct path and filename
import Substance from "./Substance.js"; // Ensure the correct path and filename
import TreatmentProgram from "./TreatmentProgram.js"; // Ensure the correct path and filename
import TreatmentSession from "./TreatmentSession.js"; // Ensure the correct path and filename
import OverdoseIncident from "./OverdoseIncident.js"; // Ensure the correct path and filename
import EmergencyVisit from "./EmergencyVisit.js"; // Ensure the correct path and filename
import CommunityResource from "./CommunityResource.js"; // Ensure the correct path and filename
import Feedback from "./Feedback.js"; // Ensure the correct path and filename

// Replace with your database credentials
const sequelize = new Sequelize("pharmasentry", "root", "", {
    host: "localhost",
    dialect: "mysql", // or 'postgres' for PostgreSQL
});

const db = {};

// Define models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Initialize models
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
db.User.hasMany(db.Patient, { foreignKey: "User ID" }); // Ensure the foreign key matches your model
db.Patient.belongsTo(db.User, { foreignKey: "User ID" });

db.Patient.hasMany(db.TreatmentSession, { foreignKey: "PatientID" });
db.TreatmentSession.belongsTo(db.Patient, { foreignKey: "PatientID" });

db.TreatmentProgram.hasMany(db.TreatmentSession, { foreignKey: "ProgramID" });
db.TreatmentSession.belongsTo(db.TreatmentProgram, { foreignKey: "ProgramID" });

db.Patient.hasMany(db.OverdoseIncident, { foreignKey: "PatientID" });
db.OverdoseIncident.belongsTo(db.Patient, { foreignKey: "PatientID" });

db.Substance.hasMany(db.OverdoseIncident, { foreignKey: "SubstanceID" });
db.OverdoseIncident.belongsTo(db.Substance, { foreignKey: "SubstanceID" });

db.Patient.hasMany(db.EmergencyVisit, { foreignKey: "PatientID" });
db.EmergencyVisit.belongsTo(db.Patient, { foreignKey: "PatientID" });

db.CommunityResource.belongsToMany(db.Patient, { through: "PatientResources" });
db.Patient.belongsToMany(db.CommunityResource, { through: "PatientResources" });

db.User.hasMany(db.Feedback, { foreignKey: "User ID" });
db.Feedback.belongsTo(db.User, { foreignKey: "User ID" });

// Export the db object
export default db;