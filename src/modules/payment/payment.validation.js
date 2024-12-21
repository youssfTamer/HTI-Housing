import Joi from 'joi';

export const createPaymentVal = Joi.object({
        booking: Joi.string().required(),
    })


export const reviewPaymentVal = Joi.object({
        status: Joi.string().valid('approved', 'rejected').required(),
        adminComment: Joi.string().when('status', {
            is: 'rejected',
            then: Joi.required(),
            otherwise: Joi.optional()
        }),
        paymentId: Joi.string().required()
    })

