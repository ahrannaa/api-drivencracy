import { Router } from "express"
import { choiceValidation } from "../middlewares/choiceValidation.middlewares.js"
import { registerChoice, getChoices, vote } from "../controllers/choice.controllers.js"


const choiceRoutes = Router()

choiceRoutes.post("/choice", choiceValidation, registerChoice)
choiceRoutes.get("/poll/:id/choice", getChoices)
choiceRoutes.post("/choice/:id/vote", vote)

export default choiceRoutes