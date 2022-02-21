const users = require("../database");

function isUserRegistered(req, res, next) {
    try {
        const {email, password} = req.body;
        const userIndex = users.findIndex(user => user.email === email && user.password === password);

        if (!email || !password) throw new Error('Login or password is not provided!');

        if (password.length < 6) throw new Error('Not valid password');

        if (userIndex === -1) throw new Error('User is not registered OR Wrong login or password!');

        req.user = users[userIndex].id;
        next();
    } catch ({message}) {
        res.status(400).render('error', {message});
    }
}

module.exports = isUserRegistered;