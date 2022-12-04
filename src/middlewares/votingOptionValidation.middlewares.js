import { ObjectId } from "mongodb";
import { surveyCollection, votingOptionCollection } from "../database/db.js";
import { votingOptionSchema } from "../models/votingOption.models.js";


export async function votingValidationSchema(req, res, next) {
    const { title, pollId } = req.body

    const validation = votingOptionSchema.validate({ title, pollId }, { abortEarly: false })

    if (validation.error) {
        const erros = validation.error.details.map((detail) => detail.message)
        res.status(422).send(erros)
        return;
    }

    const survey = await surveyCollection.findOne({ _id: ObjectId(pollId) })
    if (survey === null) {
        res.status(404).send("Nenhuma enquete cadastrada.")
        return
    }

    const votingOption = await votingOptionCollection.findOne({ title: title })
    if (votingOption != null) {
        res.status(409).send("Esse title já existe")
        return
    }

    const vote = await votingOptionCollection.insertOne({ title, pollId: ObjectId(pollId) })
    const returnOption = await votingOptionCollection.findOne({ _id: vote.insertedId })
    res.status(201).send(returnOption)

    next()
}