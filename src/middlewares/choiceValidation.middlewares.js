import { ObjectId } from "mongodb";
import { pollCollection, choiceCollection } from "../database/db.js";
import { choiceSchema } from "../models/choice.models.js";


export async function choiceValidationSchema(req, res, next) {
    const { title, pollId } = req.body

    const validation = choiceSchema.validate({ title, pollId }, { abortEarly: false })

    if (validation.error) {
        const erros = validation.error.details.map((detail) => detail.message)
        res.status(422).send(erros)
        return;
    }

    const survey = await pollCollection.findOne({ _id: ObjectId(pollId) })
    if (survey === null) {
        res.status(404).send("Nenhuma enquete cadastrada.")
        return
    }

    const votingOption = await choiceCollection.findOne({ title: title })
    if (votingOption != null) {
        res.status(409).send("Esse title já existe")
        return
    }

    const vote = await choiceCollection.insertOne({ title, pollId: ObjectId(pollId) })
    const returnOption = await choiceCollection.findOne({ _id: vote.insertedId })
    res.status(201).send(returnOption)

    next()
}