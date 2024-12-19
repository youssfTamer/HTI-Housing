import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'
import { gender, roles } from '../../utils/constant/enums.js'

export const signupVal = joi.object({
    name:generalFields.String.required(),
    email:generalFields.email,
    password:generalFields.password.required(),
    phone:generalFields.phone.required(),
    department:generalFields.String.required(),
    gender:generalFields.String.valid(...Object.values(gender)).required(),
    role:generalFields.String.valid(roles.STUDENT).required(),
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
    newPassword:generalFields.password.required(),
    OTP: generalFields.String.required()
})

export const staffSignupVal = joi.object({
    name: generalFields.String.required(),
    email: generalFields.email,
    password: generalFields.password.required(),
    buildingName: generalFields.String.required(),
    gender: generalFields.String.valid(...Object.values(gender)).required(),
    role: generalFields.String.valid(roles.STAFF,roles.MANAGER).required()
})

export const dashboardSignupVal = joi.object({
    name: generalFields.String.required(),
    email: generalFields.email.required(),
    password: generalFields.password.required(),
    confirmPassword: generalFields.cPassword.required()
});

export const dashboardLoginVal = joi.object({
    email: generalFields.email.required(),
    password: generalFields.password.required(),
});
