import joi from "joi"

export const userSchema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().email().trim().required(),
    password: joi.string().trim().required(),
    confirmPassword: joi.string().trim().required()
})

export const userLoginSchema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().trim().required()
})