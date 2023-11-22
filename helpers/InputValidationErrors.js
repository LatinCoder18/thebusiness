class InputValidationError {
    constructor({msg = '', param = '', location = ''}) {
        this.msg = msg;
        this.param = param;
        this.location = location;
    }
}
module.exports = InputValidationError;