import { Router } from "express"
import { choiceValidation } from "../middlewares/choiceValidation.middlewares.js"
import { expireAtValidation } from "../middlewares/pollValidation.middlewares.js"
import { registerChoice, getChoices, vote } from "../controllers/choice.controllers.js"


const choiceRoutes = Router()

choiceRoutes.post("/choice", [choiceValidation, expireAtValidation], registerChoice)
choiceRoutes.get("/poll/:id/choice", getChoices)
choiceRoutes.post("/choice/:id/vote", expireAtValidation, vote)

export default choiceRoutes