import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config()

const mongoClient = new MongoClient(process.env.MONGO_URI)

try {
    await mongoClient.connect()
    console.log("MongoDb Conectado")
} catch (err) {
    console.log(err)
}

export const db = mongoClient.db("api-drivenCracy");
export const pollCollection  = db.collection("poll") // enquete
export const choiceCollection = db.collection("choice")//opção de voto
export const voteCollection = db.collection("vote")// voto
