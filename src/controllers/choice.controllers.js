import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { choiceCollection, pollCollection, voteCollection } from "../database/db.js";

export async function registerChoice(req, res) {
    const choice = {
        title: req.body.title.toLowerCase(),
        pollId: ObjectId(req.body.pollId)
    }

    const poll = await pollCollection.findOne({ _id: choice.pollId })

    if (!poll) {
        res.status(404).send(" Enquente não existe" )
        return
    }

    if (dayjs().isAfter(dayjs(poll.expireAt))) {
        res.status(403).send("Enquete expirada")
        return
    }

    const { insertedId } = await choiceCollection.insertOne(choice)
    res.status(201).send({ ...choice, _id: insertedId })
}

export async function getChoices(req, res) {
    const { id } = req.params

    try {
        const poll = await pollCollection.findOne({ _id: ObjectId(id) })
        if (!poll) {
            res.status(404).send("Essa enquete não existe")
            return
        }

        const choices = await choiceCollection.find({ pollId: poll._id }).toArray()
        res.send(choices)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function vote(req, res) {
    const { id } = req.params
    const choiceId = ObjectId(id)

    try {
        const choice = await choiceCollection.findOne({ _id: choiceId })
        if (!choice) {
            res.status(404).send("Opção de voto não existe")
            return
        }

        const poll = await pollCollection.findOne({ _id: choice.pollId })

        if (!poll) {
            res.status(404).send("Enquente não existe")
            return
        }
    
        if (dayjs().isAfter(dayjs(poll.expireAt))) {
            res.status(403).send("Enquete expirada")
            return
        }

        const vote = {
            createdAt: dayjs().format('YYYY-MM-DD HH:mm'),
            choiceId: choiceId
        }

        await voteCollection.insertOne(vote)
        res.status(201).send("Obrigada pelo seu voto!")

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}