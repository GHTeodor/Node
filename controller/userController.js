const users = require("../database");

class UserController {
    renderUsers({query:{city, age}}, res) {
        let userQ = [...users];

        if (city && age)
            userQ = userQ.filter(user => user.city === city && user.age === age);
        else if (city || age)
            userQ = (city) ? userQ.filter(user => user.city === city) : userQ.filter(user => user.age === age);

        res.render('users', {users: userQ});
    }

    getUserByID({params:{userID}}, res) {
        const user = users.find(user => user.id === +userID);

        res.render('user', {user});
    }

    deleteUserByID({params:{userID}}, res) {
        users.splice(users.findIndex(user => user.id === +userID),1);

        res.redirect('/users');
    }
}

module.exports = new UserController();