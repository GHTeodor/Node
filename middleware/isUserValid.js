const users = require("../database");

function isUserValid(req, res, next) {
    try {
        const {firstName, lastName, email, password, age, city} = req.body;

        if (!firstName || !lastName || !email || !password || !age || !city)
            throw new Error('All fields must be not empty');

        if (users.some(user => user.email === email)) {
            throw new Error(`User with ${email} Email is already exist`);
        }

        req.users = users;
        next();
    } catch ({message}) {
        res.status(400).render('error', {message});
    }
}

module.exports = isUserValid;