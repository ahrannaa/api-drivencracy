import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { votingOptionCollection, voteCollection } from "../database/db.js";



export async function getVote(req, res) {
    const { id } = req.params

    try {
        const vote = await votingOptionCollection.find({ pollId: ObjectId(id) }).toArray()
        if (vote.length == 0) {
            res.status(404).send("Enquete não existe")
            return
        }

        res.send(vote)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function postVote(req, res) {
    const { id } = req.params

    try {
        const vote = await votingOptionCollection.findOne({ _id: ObjectId(id) })
        if (!vote) {
            res.status(404).send("Essa opção não existe")
        }

        const sendVote = {
            createdAt: dayjs().format('YYYY-MM-DD HH:mm'),
            choiceId: ObjectId(id),
        }

         await voteCollection.insertOne(sendVote)
        res.status(201).send("Obrigada pelo seu voto!")

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}