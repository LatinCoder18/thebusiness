const { validationResult } = require("express-validator");
const InputValidationError = require("../helpers/InputValidationErrors");
const ApiError = require("../helpers/ApiError");
/**
 * Clase para enviar una respuesta a la aplicación cliente con el mismo formato de toda la aplicación.
 */
class ValidatorMiddleware {
    static validateFields = async (request, response, next) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                let validationErrors = [];
                let firstValidation = "";
                // Recorre los errores de validación y los agrega a un arreglo de errores de validación.
                for (const error of errors.array()) {
                    // Guardo el primer mensaje de error para mostrarlo en el ApiError.
                    if (firstValidation === "") {
                        firstValidation = error.msg;
                    }
                    validationErrors.push(new InputValidationError({ msg: error.msg, location: error.location, param: error.param }));
                }
                const statusCode = 400;
                const responseObject = new ApiError(
                    {
                        clientErrorMessage: firstValidation,
                        debugErrorMessage: firstValidation,
                        inputValidationErrors: validationErrors,
                    }
                );
                return response.status(statusCode).send(responseObject);
            }

        }
        catch (error) {
            next(error);
        }
        next();
    }

}
module.exports = ValidatorMiddleware;