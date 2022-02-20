const {Router} = require("express");

const errorsController = require("../controllers/errorsController");

const errorsRouter = Router();

errorsRouter.get('/', errorsController.renderErrors);

module.exports = errorsRouter;