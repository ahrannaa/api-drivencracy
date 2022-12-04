import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import surveyRoutes from "./routes/survey.routes.js";
import votingOptionRoutes from "./routes/votingOption.routes.js";
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(surveyRoutes);
app.use(votingOptionRoutes);


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running in port ${port}`))

