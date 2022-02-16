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

const inPersonUsers = [
    {name: "Alfonso", age: 22, city: "Lviv"},
    {name: "Rick", age: 22, city: "Davenport"},
    {name: "Morty", age: 22, city: "Davenport"}
];
const onlineUsers = [
    {name: "Pablo", age: 23, city: "Kyiv"},
    {name: "Homer", age: 23, city: "Springfield"},
    {name: "Bender", age: 23, city: "New York"}
];

function createUsers(folder, users) {
    fs.mkdir(path.join(__dirname, 'main', folder), {recursive: true}, err => {
        if (err) {
            console.log(err);
            throw err;
        }
        for (let j = 0; j < users.length; j++) {
            fs.writeFile(path.join(__dirname, 'main', folder, `${users[j].name}-${j}.txt`),
                `NAME: ${users[j].name}\nAGE: ${users[j].age}\nCITY: ${users[j].city}`, err => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                });
        }
    });
}

createUsers("online", onlineUsers);
createUsers("inPerson", inPersonUsers);

function replaceData(formTo = 'inPerson', toFrom = 'online') {
    fs.readdir(path.join(__dirname, 'main', formTo), (err, files_txt) => {
        if (err) {
            console.log(err);
            throw err;
        }
        files_txt.forEach(file => fs.rename(path.join(__dirname, 'main', formTo, file), path.join(__dirname, 'main', toFrom, file), err => {
            if (err) {
                console.log(err);
                throw err;
            }
        }));
    });
}

// replaceData();
// replaceData('online', 'inPerson');