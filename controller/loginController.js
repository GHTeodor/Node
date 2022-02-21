class LoginController {
    loginUser(req, res) {
        res.render('login');
    }

    loginUserID({body, users}, res) {
        users.push({...body, id: users.length ? users[users.length - 1].id + 1 : 1});
        res.redirect('/users');
    }
}

module.exports = new LoginController();