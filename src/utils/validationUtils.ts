import Joi from 'joi';

export const CreateUserSchema = Joi.object({
    user_name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required()
});

/**
 * Validates data against a Joi schema
 * @param schema Joi schema to validate against
 * @param data Input data to validate
 * @returns { error } Joi validation error, if any
 */
export const ValidateSchema = (schema: Joi.ObjectSchema, data: unknown) => {
    return schema.validate(data);
};