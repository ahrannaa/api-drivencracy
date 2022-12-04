import { Router } from "express"
import { surveyValidationSchema } from "../middlewares/surveyValidation.middlewares.js"
import { registerSurvey, getSurvey} from "../controllers/survey.controllers.js"


const surveyRoutes = Router()

surveyRoutes.post("/poll", surveyValidationSchema, registerSurvey)
surveyRoutes.get("/poll", getSurvey)


export default surveyRoutes