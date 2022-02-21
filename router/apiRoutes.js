const { Router } = require('express');

const {apiHomeRouter, loginRouter, notFoundRouter, errorsRouter, singInRouter, userRouter} = require("./");

const routes = Router();

routes.use('/', apiHomeRouter);
routes.use('/users', userRouter);
routes.use('/login', loginRouter);
routes.use('/singIn', singInRouter);
routes.use('/errors', errorsRouter);
routes.use(notFoundRouter);

module.exports = routes;