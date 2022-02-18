// // 1. /login, поля які треба відрендерити в файлі hbs: firstName, lastName, email(унікальне поле), password, age,
// // city просто зробити template з цим усім і вводити свої дані які будуть пушитися в масив і redirect робити на
// // сторінку з усіма users /users і перевірка чи такий email не існує, якщо існує, то redirect на error пейдж
// // 2. /users просто сторінка з усіма users, але можна по query параметрам їх фільтрувати по age і city
// // 3. /user/:id сторінка з інфою про одного user
// // 4. зробити якщо не відпрацюють endpoint, то на сторінку redirect NotFound
// // =================================================================================================================
// // - додайте endpoint signIn який буде приймати email і password і якщо все вірно, то redirect на сторінку цього
// // * хто хоче складніше реалізуйте видалення користувача.
// // Кнопка повинна знаходитись на сторінці з інфою про одного user. Після видалення redirect на "/users"

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

let users = [
    {id: 1, firstName: 'A', lastName: 'A', email: 'A1@a.com', password: 'const.log1', age: '21', city: 'city1'},
    {id: 2, firstName: 'B', lastName: 'B', email: 'B2@b.com', password: 'const.log2', age: '32', city: 'city2'},
    {id: 3, firstName: 'C', lastName: 'C', email: 'C3@c.com', password: 'const.log3', age: '43', city: 'city3'},
    {id: 4, firstName: 'D', lastName: 'D', email: 'D4@d.com', password: 'const.log4', age: '54', city: 'city4'}
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

    res.render('users', {users: userQ});
});

app.get('/users/:userID', ({params}, res) => {
    const {userID} = params;
    const user = users[userID - 1];
    res.render('user', {user});
});

app.post('/users/:userId', ({params}, res) => {
    users = users.filter(user => user.id !== +params.userId);

    res.redirect('/users');
});

app.get('/login', ((req, res) => res.render('Login')));

app.post('/login', (({body}, res) => {
    if (users.some(user => user.email === body.email)) {
        error.push(body);
        return res.redirect('/error');
    }
    users.push({...body, id: users.length ? users[users.length - 1].id + 1 : 1});
    return res.redirect('/users');
}));

app.get('/singIn', (req, res) => res.render('singIn'));

app.post('/singIn', ({body}, res) => {
    const singIN = users.find(user => user.email === body.email && user.password === body.password);
    (singIN) ? res.redirect('users/' + singIN.id) : res.send('<h1>Wrong password or email!!!!!</h1>');
});

app.get('/error', (req, res) =>
    res.render('error', {error}));

app.use((req, res) =>
    res.render('notFound'));

const PORT = 5200;
app.listen(PORT, () => console.log(`Server has been started on PORT ${PORT}...`));