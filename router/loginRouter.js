const { Router } = require("express");

const {loginController} = require("../controller");
const {userValid} = require("../middleware");

const loginRouter = Router();

loginRouter.get('/', loginController.loginUser);
loginRouter.post('/', userValid, loginController.loginUserID);

module.exports = loginRouter;