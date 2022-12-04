import { ObjectId } from "mongodb";
import { votingOptionCollection } from "../database/db.js";

export async function getVote(req, res) {
    const { id } = req.params;

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