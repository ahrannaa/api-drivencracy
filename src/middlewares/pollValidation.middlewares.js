import { pollSchema } from "../models/poll.models.js";

export async function pollValidationSchema(req, res, next) {
    const { title, expireAt } = req.body

    const validation = pollSchema.validate({ title, expireAt }, { abortEarly: false })

    if (validation.error) {
        const erros = validation.error.details.map((detail) => detail.message)
        res.status(422).send(erros)
        return;
    }

    next()
}