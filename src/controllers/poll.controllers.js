import { ObjectId } from "mongodb";
import { pollCollection, voteCollection, choiceCollection } from "../database/db.js"

export async function registerPoll(req, res) {
    const newPoll = req.body

    try {
        await pollCollection.insertOne(newPoll)
        res.status(201).send(newPoll)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function getPoll(req, res) {
    try {
        const polls = await pollCollection.find().toArray()
        res.send(polls)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function getResult(req, res) {
    const { id } = req.params

    try {
        const poll = await pollCollection.findOne({ _id: ObjectId(id) })
        if (!poll) {
            res.status(404).send("Essa enquete não existe")
        }
        const choices = await choiceCollection.find({ pollId: ObjectId(id) }).toArray()
        if (choices.length == 0) {
            res.status(404).send("Essa opção não existe")
        }

        const winner = {
            title: "",
            votes: 0
        }

        for (const choice of choices) {
            const votes = await voteCollection.find({ choiceId: ObjectId(choice._id) }).toArray()
            const total = votes.length
            if (total > winner.votes) {
                winner.votes = total
                winner.title = choice.title
            }
        }

        res.send({ ...poll, result: winner })

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}