// index.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import db from "./models/index.js"; // Ensure this points to your models/index.js
import userRoutes from "./routes/users.js";
import substancesRoutes from "./routes/substances.js";
import patientController from './controllers/patient.js';
import authRoutes from "./routes/auth.js";
import overviewRouter from "./routes/overview.js"; // Import the overview routes
import treatmentController from "./controllers/treatmentSessions.js"; // Import the treatment session routes

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
app.use("/server/auth", authRoutes);
app.use("/server/overview", overviewRouter); // Add the overview routes
app.use("/patients", patientController); // Add patient routes
app.use("/treatmentSessions", treatmentController); // Add treatment session routes

// Start the server
app.listen(PORT, () => {
    console.log(`API working on port ${PORT}!`);
});