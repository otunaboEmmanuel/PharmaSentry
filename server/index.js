import express from "express";
const app = express()
import userRoutes from "./routes/users.js"
import substancesRoutes from "./routes/substances.js"
import incidentRoutes from "./routes/incident.js"
import incident_substancesRoutes from "./routes/incident_substances.js"
import facilitiesRoutes from "./routes/facilities.js"
import authRoutes from "./routes/auth.js"
import cors from 'cors'
import cookieParser from "cookie-parser"


//middlewares
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Credentials", true)

    next()
})
app.use(express.json())
app.use(
    cors({
    origin: "http://localhost:5173",
    credentials: true,
})
);
app.use(cookieParser())


app.use("/server/users" , userRoutes)
app.use("/server/substances" , substancesRoutes)
app.use("/server/incident" , incidentRoutes)
app.use("/server/incident_substances" , incident_substancesRoutes)
app.use("/server/facilities" , facilitiesRoutes)
// app.use("/server/drug-use-details" , drug_detailsRoutes)
app.use("/server/auth" , authRoutes)

app.listen(8800, () => {
    console.log("API working!")
})