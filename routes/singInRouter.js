const {Router} = require("express");

const singInController = require("../controllers/singInController");
const {userRegistered} = require("../middleware/index");

const singInRouter = Router();

singInRouter.get('/', singInController.renderSingIn);
singInRouter.post('/', userRegistered, singInController.wrongSingIn);

module.exports = singInRouter;