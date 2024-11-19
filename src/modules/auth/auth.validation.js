import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const signupVal = joi.object({
    name:generalFields.String.required(),
    email:generalFields.email,
    password:generalFields.password.required(),
    phone:generalFields.phone
})

export const loginVal = joi.object({
    email: generalFields.email.required(),
    password:generalFields.password.required(),
})

export const forgetPasswordVal = joi.object({
    email:generalFields.email.required()
})

export const resetPassword = joi.object({
    email:generalFields.email.required(),
    password:generalFields.password.required()
})