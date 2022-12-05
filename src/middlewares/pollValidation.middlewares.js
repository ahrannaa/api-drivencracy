import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { pollCollection } from "../database/db.js";
import { pollSchema } from "../models/poll.models.js";

export async function pollValidationSchema(req, res, next) {
    const body = req.body

    const validation = pollSchema.validate(body, { abortEarly: false })

    if (validation.error) {
        const erros = validation.error.details.map((detail) => detail.message)
        res.status(422).send(erros)
        return
    }

    if (body.expireAt == "") {
        body.expireAt = dayjs().add(30, 'day').format("YYYY-MM-DD HH:mm")
    }

    next()
}
