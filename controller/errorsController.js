class ErrorsController {
    renderErrors(req, res) {
        res.render('error');
    }
}

module.exports = new ErrorsController();