import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import db from "./models/index.js"; // Ensure this points to your models/index.js
import userRoutes from "./routes/users.js";
import substancesRoutes from "./routes/substances.js";
// import incidentRoutes from "./routes/TreatmentPrograms.js";
import incident_substancesRoutes from "./routes/patient.js";
import patientsRoutes from "./routes/patient.js";
import authRoutes from "./routes/auth.js";
import overviewRouter from "./routes/overview.js"; // Import the overview routes

const app = express();
const PORT = process.env.PORT || 8800; // Set the port

// Middleware
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

// Sync database and create tables without dropping existing ones
db.sequelize
    .sync({ alter: true }) // Use { alter: true } to update the schema without dropping tables
    .then(() => {
        console.log("Database & tables created!");
    })
    .catch(err => {
        console.error("Error creating database & tables:", err);
    });

// Routes
app.use("/server/users", userRoutes);
app.use("/server/substances", substancesRoutes);
// app.use("/server/incident", incidentRoutes);
app.use("/server/incident_substances", incident_substancesRoutes);
app.get("/server/patient", patientsRoutes);
app.use("/server/auth", authRoutes);
app.use("/server/overview", overviewRouter); // Add the overview routes

let patients = []; // In-memory storage for patients

// Route to get all patients
app.get('/server/patient', (req, res) => {
    res.json(patients);
});

// Route to add a new patient
app.post('/server/patient', (req, res) => {
    const newPatient = { id: patients.length + 1, ...req.body }; // Add an ID
    patients.push(newPatient);
    res.status(201).json(newPatient); // Respond with the created patient
});

// Route to update a patient
app.put('/server/patient/:id', (req, res) => {
    const { id } = req.params;
    const index = patients.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
        patients[index] = { ...patients[index], ...req.body };
        res.json(patients[index]);
    } else {
        res.status(404).send('Patient not found');
    }
});

// Route to delete a patient
app.delete('/server/patient/:id', (req, res) => {
    const { id } = req.params;
    patients = patients.filter(p => p.id !== parseInt(id));
    res.status(204).send(); // No content
});

// Start the server
app.listen(PORT, () => {
    console.log(`API working on port ${PORT}!`);
});