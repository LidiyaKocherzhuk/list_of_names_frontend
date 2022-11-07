import * as Joi from "joi";

export const userValidation = {
    save: Joi.object({
        name: Joi.string()
            .alphanum()
            .required()
            .min(2)
            .max(50)
            .trim()
            .messages({
                'string.empty': 'Not empty!',
                'string.min': 'Not min 2 characters!',
                'string.max': 'Not max 50 characters!',
            }),
        surname: Joi.string()
            .alphanum()
            .allow('')
            .min(2)
            .max(50)
            .trim()
            .messages({
                'string.min': 'Not min 2 characters!',
                'string.max': 'Not max 50 characters!',
            }),
        rank: Joi.number()
            .integer()
            .required()
            .messages({
                'number.empty': 'Not empty!',
            }),
    }),

    update: Joi.object({
        name: Joi.string()
            .alphanum()
            .allow('')
            .min(2)
            .max(50)
            .trim()
            .messages({
                'string.min': 'Not min 2 characters!',
                'string.max': 'Not max 50 characters!',
            }),
        surname: Joi.string()
            .alphanum()
            .allow('')
            .min(2)
            .max(50)
            .trim()
            .messages({
                'string.min': 'Not min 2 characters!',
                'string.max': 'Not max 50 characters!',
            }),
        rank: Joi.number()
            .integer(),
    }),

}
