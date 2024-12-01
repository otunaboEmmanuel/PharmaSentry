import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./models/index.js"; // Ensure this points to your models/index.js
import userRoutes from "./routes/users.js";
import substancesRoutes from "./routes/substances.js";
import incidentRoutes from "./routes/incident.js";
import incident_substancesRoutes from "./routes/incident_substances.js";
import facilitiesRoutes from "./routes/facilities.js";
import authRoutes from "./routes/auth.js";

const app = express();

// Middleware
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
import bodyParser from'body-parser';
app.use(bodyParser.json());

// Sync database and create tables
db.sequelize
    .sync({ force: true }) // Use { force: true } only in development to drop and recreate tables
    .then(() => {
        console.log("Database & tables created!");
    });

// Routes
app.use("/server/users", userRoutes);
app.use("/server/substances", substancesRoutes);
app.use("/server/incident", incidentRoutes);
app.use("/server/incident_substances", incident_substancesRoutes);
app.use("/server/facilities", facilitiesRoutes);
app.use("/server/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 8800; // Changed to 8800 as per your last line
app.listen(PORT, () => {
    console.log(`API working on port ${PORT}!`);
});
