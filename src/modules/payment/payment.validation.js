import Joi from 'joi';

export const createPaymentVal = Joi.object({
        booking: Joi.string().required(),
    })


export const reviewPaymentVal = Joi.object({
        status: Joi.string().valid('approved', 'rejected').required(),
        
        paymentId: Joi.string().required()
    })

