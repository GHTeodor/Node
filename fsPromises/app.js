const fsPromises = require('fs').promises;
// const fsPromises2 = require('fs/promises');
const path = require('path');

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

const mainPath = path.join(__dirname, "main");

async function createData() {
    await fsPromises.mkdir(mainPath);
    await Promise.all([
        fsPromises.mkdir(path.join(mainPath, "inPerson")),
        fsPromises.mkdir(path.join(mainPath, "online")),

        writeAndAppendFile("inPerson", inPersonUsers),
        writeAndAppendFile("online", onlineUsers)
    ]);
}

async function writeAndAppendFile(pathFolder, users) {
    const data = users.map(({name, age, city}) => `NAME: ${name}\nAGE: ${age}\nCITY: ${city}\n\n`);
    return fsPromises.writeFile(path.join(mainPath, pathFolder, 'users.txt'), data);
}

async function swap(folder1, folder2) {
    try {
        const [dataFrom1file, dataFrom2file] = await Promise.all([
            fsPromises.readFile(path.join(mainPath, folder1, "users.txt"), "utf-8"),
            fsPromises.readFile(path.join(mainPath, folder2, "users.txt"), "utf-8")
        ]);

        await Promise.all([
            fsPromises.appendFile(path.join(mainPath, folder1, "users.txt"), dataFrom2file, {flag: "w"}),
            fsPromises.appendFile(path.join(mainPath, folder2, "users.txt"), dataFrom1file, {flag: "w"})
        ]);
    } catch (error) {
        console.log(error);
    }
}

createData();
// swap("inPerson", "online");