import { ObjectId } from "mongodb";
import { pollCollection, choiceCollection } from "../database/db.js";
import { choiceSchema } from "../models/choice.models.js";


export async function choiceValidation(req, res, next) {
    const { title, pollId } = req.body

    const validation = choiceSchema.validate({ title, pollId }, { abortEarly: false })

    if (validation.error) {
        const erros = validation.error.details.map((detail) => detail.message)
        res.status(422).send(erros)
        return;
    }

    const poll = await pollCollection.findOne({ _id: ObjectId(pollId) })
    if (!poll) {
        res.status(404).send("Enquete não existe")
        return
    }

    const choice = await choiceCollection.findOne({ pollId: ObjectId(pollId), title: title.toLowerCase()})
    if (choice) {
        res.status(409).send("Opção de voto já cadastrada")
        return
    }

    next()
}