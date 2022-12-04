import { Router } from "express"
import { choiceValidationSchema } from "../middlewares/choiceValidation.middlewares.js"
import { getChoices, vote } from "../controllers/choice.controllers.js"


const choiceRoutes = Router()

choiceRoutes.post("/choice", choiceValidationSchema )
choiceRoutes.get("/poll/:id/choice", getChoices)
choiceRoutes.post("/choice/:id/vote", vote)

export default choiceRoutes