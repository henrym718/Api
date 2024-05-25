import joi from "joi";
// import createError from "http-errors";

export const validator = (schema) => {
    return (req, res, next) => {
        try {
            req.body = joi.attempt(req.body, schema, { abortEarly: true, stripUnknown: true })
            next();
        } catch (error) {
            // const errMessages = err.details.map((e) => e.message); // Obtén todos los mensajes de error de Joi
            // const joiMessages = errMessages.join("; "); // Concatena los mensajes en uno solo
            // next(createError.BadRequest(joiMessages));
            next(error)
        }
    };
};
