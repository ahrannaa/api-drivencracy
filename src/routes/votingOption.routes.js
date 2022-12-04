import { Router } from "express"
import { votingValidationSchema } from "../middlewares/votingOptionValidation.middlewares.js"
import { } from "../controllers/survey.controllers.js"


const votingOptionRoutes = Router()

votingOptionRoutes.post("/choice", votingValidationSchema )

export default votingOptionRoutes