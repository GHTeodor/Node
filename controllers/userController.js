let users = require("../database/users");

class UserController {
    renderUsers({query}, res) {
        const {city, age} = query;
        let userQ = [...users];

        if (city && age)
            userQ = userQ.filter(user => user.city === city && user.age === age);
        else if (city || age)
            (city) ? userQ = userQ.filter(user => user.city === city) : userQ = userQ.filter(user => user.age === age);

        res.render('users', {users: userQ});
    }

    getUserByID({params}, res) {
        const {userID} = params;
        const user = users[userID - 1];
        res.render('user', {user});
    }

    deleteUserByID({params}, res) {
        users = users.filter(user => user.id !== +params.userID);

        res.redirect('/users');
    }
}

module.exports = new UserController();