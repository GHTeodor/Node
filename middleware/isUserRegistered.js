const users = require("../database/users");

function isUserRegistered(req, res, next) {
    try {
        const {email, password} = req.body;
        const userIn = users.find(user => user.email === email && user.password === password);

        if (!email || !password) throw new Error('Login or password is not provided!');

        if (password.length < 6) throw new Error('Not valid password');

        if (!userIn) throw new Error('User is not registered OR Wrong login or password!');

        req.user = userIn;
        next();
    } catch ({message}) {
        console.log(message);
        res.status(400).send(message);
    }
}

module.exports = isUserRegistered;