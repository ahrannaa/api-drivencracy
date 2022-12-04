import { ObjectId } from "mongodb";
import { surveyCollection, voteCollection, votingOptionCollection } from "../database/db.js"

export async function registerSurvey(req, res) {
    const newSurvey = req.body;

    try {
        const survey = await surveyCollection.insertOne(newSurvey)
        res.status(201).send(newSurvey)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function getSurvey(req, res) {

    try {
        const survey = await surveyCollection.find().toArray()
        res.send(survey)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

}

export async function getResult(req, res) {
    const { id } = req.params

    try {
        const poll = await surveyCollection.findOne({ _id: ObjectId(id) })
        if (!poll) {
            res.status(404).send("Essa enquete não existe")
        }
        const votingOption = await votingOptionCollection.find({ pollId: ObjectId(id) }).toArray()
        if (votingOption.length == 0) {
            res.status(404).send("Essa opção não existe")
        }

        const winner = {
            title: "",
            votes: 0
        }

        for(const option of votingOption) {
            const votes = await voteCollection.find({ choiceId: ObjectId(option._id) }).toArray()
            const total = votes.length
            if (total > winner.votes) {
                winner.votes = total
                winner.title = option.title
            }
        }

        res.send({ ...poll, result: winner })

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}