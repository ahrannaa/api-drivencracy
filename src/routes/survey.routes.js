import { Router } from "express"
import { surveyValidationSchema } from "../middlewares/surveyValidation.middlewares.js"
import { registerSurvey, getSurvey, getResult} from "../controllers/survey.controllers.js"


const surveyRoutes = Router()

surveyRoutes.post("/poll", surveyValidationSchema, registerSurvey)
surveyRoutes.get("/poll", getSurvey)
surveyRoutes.get("/poll/:id/result", getResult)

export default surveyRoutes