// Всі дії виконувати з допомогою модулів (вручну нічого не створюємо)
// Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson
// Потім створити в вашому головному файлі (для прикладу app.js) два масиви з обєктами user
// ({name: "Andrii", age: 22, city: "Lviv" }),  відповідно перший - onlineUsers, другий - inPersonUsers;
// і створити файли txt в папках (online, inPerson) в яких як дату покласти юзерів з ваших масивів,
// але щоб ваш файл виглядав як NAME: ім'я з обєкту і т.д і всі пункти з нового рядка.
//
// Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу.
// (ті, що були в папці inPerson будуть в папці online)

const path = require("path");
const fs = require("fs");

const onlineUsers = [{ name: "Alfonso", age: 22, city: "Lviv" }];
const inPersonUsers = [{ name: "Pablo", age: 23, city: "Kyiv" }];

fs.mkdir(path.join(__dirname, 'main', 'online'), {recursive: true}, err => {
    if (err) {
        console.log(err);
        throw err;
    }
    fs.writeFile(path.join(__dirname, 'main', 'online', 'online.txt'),
        `NAME: ${onlineUsers[0].name}\nAGE: ${onlineUsers[0].age}\nCITY: ${onlineUsers[0].city}`, err => {
        if (err) {
            console.log(err);
            throw err;
        }
    });
});

fs.mkdir(path.join(__dirname, 'main', 'inPerson'), {recursive: true}, err => {
    if (err) {
        console.log(err);
        throw err;
    }
    fs.writeFile(path.join(__dirname, 'main', 'inPerson', 'inPerson.txt'),
        `NAME: ${inPersonUsers[0].name}\nAGE: ${inPersonUsers[0].age}\nCITY: ${inPersonUsers[0].city}`, err => {
        if (err) {
            console.log(err);
            throw err;
        }
    });
});

function replaceData(formTo, toFrom) {
    fs.readFile(path.join(__dirname, 'main', 'inPerson', formTo), "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        fs.appendFile(path.join(__dirname, 'main', 'online', toFrom), data, {flag: "w"}, err => {
            if (err) {
                console.log(err);
                throw err;
            }
        });
    });
    fs.readFile(path.join(__dirname, 'main', 'online', toFrom), "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        fs.appendFile(path.join(__dirname, 'main', 'inPerson', formTo), data, {flag: "w"}, err => {
            if (err) {
                console.log(err);
                throw err;
            }
        });
    });
}

// replaceData('inPerson.txt', 'online.txt');