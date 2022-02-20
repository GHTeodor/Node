let errors = require("../database/errors");

class ErrorsController {
    renderErrors(req, res) {
        res.render('error', {errors});
    }
}

module.exports = new ErrorsController();