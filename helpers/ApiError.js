
/**
 * Clase utilizada para almacenar la información asociada a un error ocurrido en la Api.
 */
  class ApiError {
    constructor({clientErrorMessage = '', debugErrorMessage = '', inputValidationErrors}) {
        this.clientErrorMessage = clientErrorMessage;
        this.debugErrorMessage = debugErrorMessage;
        this.inputValidationErrors = inputValidationErrors;
    }
  }

  module.exports = ApiError;