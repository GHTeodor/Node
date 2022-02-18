// // 1. /login, поля які треба відрендерити в файлі hbs: firstName, lastName, email(унікальне поле), password, age,
// // city просто зробити template з цим усім і вводити свої дані які будуть пушитися в масив і redirect робити на
// // сторінку з усіма users /users і перевірка чи такий email не існує, якщо існує, то redirect на error пейдж
// // 2. /users просто сторінка з усіма users, але можна по query параметрам їх фільтрувати по age і city
// // 3. /user/:id сторінка з інфою про одного user
// // 4. зробити якщо не відпрацюють endpoint, то на сторінку redirect NotFound

const express = require("express");
const {engine} = require("express-handlebars");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "static")));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

const PORT = 5200;
app.listen(PORT, () => console.log(`Server has been started on PORT ${PORT}...`));

const users = [
    {firstName: 'A', lastName: 'A', email: 'A1@a.com', password: 'const.log1', age: '21', city: 'city1'},
    {firstName: 'B', lastName: 'B', email: 'B2@b.com', password: 'const.log2', age: '32', city: 'city2'},
    {firstName: 'C', lastName: 'C', email: 'C3@c.com', password: 'const.log3', age: '43', city: 'city3'},
    {firstName: 'D', lastName: 'D', email: 'D4@d.com', password: 'const.log4', age: '54', city: 'city4'}
];
let error = [];

app.get('/', (req, res) => res.json(users));

app.get('/users', ({query}, res) => {
    const {city, age} = query;
    let userQ = [...users];

    if (city && age)
        userQ = userQ.filter(user => user.city === city && user.age === age);
    else if (city || age)
        (city) ? userQ = userQ.filter(user => user.city === city) : userQ = userQ.filter(user => user.age === age);

    res.render('Users', {users: userQ});
});

app.get('/users/:userID', ({params}, res) => {
    const {userID} = params;
    const user = users[userID - 1];
    res.render('User', {user});
});

app.get('/login', ((req, res) => res.render('Login')));

app.post('/login', (({body}, res) => {
    if (users.some(user => user.email === body.email)) {
        error.push(body);
        return res.redirect('/error');
    }
    users.push(body);
    return res.redirect('/users');
}));

app.get('/error', (req, res) =>
    res.render('Error', {error}));

app.use((req, res) =>
    res.render('NotFound'));