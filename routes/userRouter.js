const {Router} = require("express");

const userController = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/', userController.renderUsers);
userRouter.get('/:userID', userController.getUserByID);
userRouter.post('/:userID', userController.deleteUserByID);

module.exports = userRouter;