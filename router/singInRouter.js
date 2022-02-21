const { Router } = require("express");

const {singInController} = require("../controller");
const {userRegistered} = require("../middleware");

const singInRouter = Router();

singInRouter.get('/', singInController.renderSingIn);
singInRouter.post('/', userRegistered, singInController.wrongSingIn);

module.exports = singInRouter;