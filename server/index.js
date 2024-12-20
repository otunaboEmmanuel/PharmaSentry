// index.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import db from "./models/index.js"; // Ensure this points to your models/index.js
import userRoutes from "./routes/users.js";
import substancesController from "./controllers/substances.js";
import patientController from './controllers/patient.js';
import authRoutes from "./routes/auth.js";
import overdoseController from "./controllers/OverdoseIncident.js"; // Import the overview routes
import sessionController from "./controllers/treatmentSessions.js"; // Import the treatment session routes
import programController from "./controllers/treatmentPrograms.js";
const app = express();
const PORT = process.env.PORT || 8800; // Set the port

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

// Sync database and create tables without dropping existing ones
db.sequelize
    .sync({ alter: false, force: false }) // Use { alter: true } to update the schema without dropping tables
    .then(() => {
        console.log("Database & tables created!");
    })
    .catch(err => {
        console.error("Error creating database & tables:", err);
    });

// Routes
app.use("/server/users", userRoutes);
app.use("/substances", substancesController);
app.use("/server/auth", authRoutes);
app.use("/overdoseIncidents", overdoseController); // Add the overview routes
app.use("/patients", patientController); // Add patient routes
app.use("/treatmentSessions", sessionController);
app.use("/treatmentPrograms", programController) // Add treatment session routes

// Start the server
app.listen(PORT, () => {
    console.log(`API working on port ${PORT}!`);
});