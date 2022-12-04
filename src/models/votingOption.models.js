import joi from "joi";

export const votingOptionSchema = joi.object({
    title: joi.string().required(),
    pollId:joi.string().required()
})