import { Router } from "express"
import { votingValidationSchema } from "../middlewares/votingOptionValidation.middlewares.js"
import { getVote } from "../controllers/votingOption.controllers.js"


const votingOptionRoutes = Router()

votingOptionRoutes.post("/choice", votingValidationSchema )
votingOptionRoutes.get("/poll/:id/choice", getVote)

export default votingOptionRoutes