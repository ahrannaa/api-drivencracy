import {  surveySchema } from "../models/survey.models.js";

export async function surveyValidationSchema(req, res, next) {
    const { title, expireAt } = req.body

    const validation = surveySchema.validate({ title, expireAt }, { abortEarly: false })

    if (validation.error) {
        const erros = validation.error.details.map((detail) => detail.message)
        res.status(422).send(erros)
        return;
    }

    next()
}