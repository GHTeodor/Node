const path = require('path');
const fs = require('fs');

// // 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу,
// // дані які ви отримали запишіть їх в інший файл, в вас вийде невеликий callback hell, пізніше я вам покажу
// // як можна це обійти, але поки зробіть так

// // 2. Створіть файл (можете вручну) заповніть його якимись даними
// // Прочитайте його, скопіюйте всі дані з нього і перенесіть їх у нову папку та файл в ній,
// // старий файл видаліть після того, як все завершиться. Також вийде callback hell

fs.mkdir(path.join(__dirname, 'main'), err => {
    if (err) {
        console.log(err);
        throw err;
    }
    // // 1. =============================================================================================

    fs.writeFile(path.join(__dirname, 'main', 'file1.txt'), 'FIRST file', err => {
        if (err) {
            console.log(err);
            throw err;
        }
        fs.readFile(path.join(__dirname, 'main', 'file1.txt'), "utf-8", (err, data) => {
            if (err) {
                console.log(err);
                throw err;
            }
            fs.writeFile(path.join(__dirname, 'main', 'new_file1.txt'), data, err => {
                if (err) {
                    console.log(err);
                    throw err;
                }
            });
        });
    });

    // // 2. =============================================================================================

    fs.writeFile(path.join(__dirname, 'main', 'file2.txt'), 'Node.js', err => {
        if (err) {
            console.log(err);
            throw err;
        }
        fs.readFile(path.join(__dirname, 'main', 'file2.txt'), "utf-8", (err, data) => {
            if (err) {
                console.log(err);
                throw err;
            }
            fs.mkdir(path.join(__dirname, 'main', 'File2'), err => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                fs.writeFile(path.join(__dirname, 'main', 'File2', 'new_file2.txt'), data, err => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    fs.unlink(path.join(__dirname, 'main', 'file2.txt'), err => {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                    });
                });
            });
        });
    });

});

// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якісь дані (можуть бути нові папки і файли
// (в файли запишіть якусь дату) ) і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать
// - це файли тоді вам потрібно їх очистити, але не видаляти,
// якщо дані - це папки, вам потрібно їх перейменувати і додати до назви префікс _new

fs.mkdir(path.join(__dirname, 'Folder3'), err => {
    if (err) {
        console.log(err);
        throw err;
    }
    fs.mkdir(path.join(__dirname, 'Folder3', 'Folder3_1'), err => {
        if (err) {
            console.log(err);
            throw err;
        }
    });
    fs.writeFile(path.join(__dirname, 'Folder3', 'file3_1.txt'),'file3_1', err => {
        if (err) {
            console.log(err);
            throw err;
        }
    });
    fs.mkdir(path.join(__dirname, 'Folder3', 'Folder3_2'), err => {
        if (err) {
            console.log(err);
            throw err;
        }
    });
    fs.writeFile(path.join(__dirname, 'Folder3', 'file3_2.txt'),'file3_2', err => {
        if (err) {
            console.log(err);
            throw err;
        }
    });
});

function reader() {
    fs.readdir(path.join(__dirname, 'Folder3'), (err, files) => {
        if (err) {
            console.log(err);
            throw err;
        }
        files.forEach(file => {
            if (path.extname(file) === ".txt") {
                fs.writeFile(path.join(__dirname, 'Folder3', file), '', err => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                });
            } else {
                fs.rename(path.join(__dirname, 'Folder3', file), path.join(__dirname, 'Folder3', `_new${file}`),
                    err => {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                    }
                );
            }
        });
    });
}

// reader();