const { Router } = require("express");

const users = require("../database");

const apiHomeRouter = Router();

apiHomeRouter.get('/', (req, res) =>
    res.json(users));

module.exports = apiHomeRouter;