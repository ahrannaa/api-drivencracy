import joi from "joi";

export const surveySchema = joi.object({
    title: joi.string().required(),
    expireAt: joi.string()
})