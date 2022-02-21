const { Router } = require("express");

const notFoundRouter = Router();

notFoundRouter.use((req, res) =>
    res.render('notFound'));

module.exports = notFoundRouter;