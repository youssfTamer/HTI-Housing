import joi from "joi"
import { AppError } from "../utils/appError.js"

const parseArray = (value,helper)=>{
    let data = JSON.parse(value)
    let schema = joi.array().items(joi.string())
    const {error} = schema.validate(data)
    if(error){
        return helper(error.details)
    }
    return true
}

export const generalFields = {
    String: joi.string(),
    description: joi.string().max(2000),
    comment: joi.string().max(2000),
    Number: joi.number().positive(),
    discount: joi.number().positive(),
    colors: joi.custom(parseArray),
    sizes: joi.custom(parseArray),
    rate: joi.number().min(1).max(5),
    objectId: joi.string().hex().length(24),
    email: joi.string().email(),
    password: joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)),
    cPassword: joi.string().valid(joi.ref('password')),
    phone: joi.string().pattern(new RegExp(/^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/)),
}

export const isValid = (schema) => {
    return (req, res, next) => {
        let data = { ...req.body, ...req.params, ...req.query }
        const {error} = schema.validate(data, { abortEarly: false })
        if(error){
            let errArr = []
            error.details.forEach((err)=>{errArr.push(err.message)});
            return next(new AppError(errArr,400))
        }
        return next()
    }
    
}
