import { surveyCollection } from "../database/db.js"

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