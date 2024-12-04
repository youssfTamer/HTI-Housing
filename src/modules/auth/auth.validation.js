import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const signupVal = joi.object({
    name:generalFields.String.required(),
    email:generalFields.email,
    password:generalFields.password.required(),
    phone:generalFields.phone.required(),
    department:generalFields.String.required(),
    gender:generalFields.String.required(),
    role:generalFields.String.required(),
    ID:generalFields.Number.required()
})

export const loginVal = joi.object({
    email: generalFields.email.required(),
    password:generalFields.password.required(),
})

export const forgetPasswordVal = joi.object({
    email:generalFields.email.required()
})

export const resetPasswordVal = joi.object({
    email:generalFields.email.required(),
    password:generalFields.password.required()
})