const { Router } = require("express");

const {errorsController} = require("../controller");

const errorsRouter = Router();

errorsRouter.get('/', errorsController.renderErrors);

module.exports = errorsRouter;