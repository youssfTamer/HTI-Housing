import Joi from 'joi';

export const createPaymentVal = {
    body: Joi.object({
        booking: Joi.string().required(),
        receiptImage: Joi.string().required()
    })
};

export const reviewPaymentVal = {
    body: Joi.object({
        status: Joi.string().valid('approved', 'rejected').required(),
        adminComment: Joi.string().when('status', {
            is: 'rejected',
            then: Joi.required(),
            otherwise: Joi.optional()
        })
    }),
    params: Joi.object({
        paymentId: Joi.string().required()
    })
};
