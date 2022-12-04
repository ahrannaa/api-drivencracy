import { Router } from "express"
import { pollValidationSchema } from "../middlewares/pollValidation.middlewares.js"
import { registerPoll, getPoll, getResult} from "../controllers/poll.controllers.js"


const pollRoutes = Router()

pollRoutes.post("/poll", pollValidationSchema, registerPoll)
pollRoutes.get("/poll", getPoll)
pollRoutes.get("/poll/:id/result", getResult)

export default pollRoutes