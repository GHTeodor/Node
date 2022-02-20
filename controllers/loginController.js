let users = require("../database/users");
let errors = require("../database/errors");

class LoginController {
    loginUser(req, res) {
        res.render('Login');
    }

    loginUserID({body}, res) {
        if (users.some(user => user.email === body.email)) {
            errors.push(body);
            return res.redirect('/errors');
        }

        users.push({...body, id: users.length ? users[users.length - 1].id + 1 : 1});
        return res.redirect('/users');
    }
}

module.exports = new LoginController();