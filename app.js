// // Попереднє ДЗ переписати на Routes, і контролери, і написати middleware яка буде перевіряти по Route /sigIn
// // чи email існує в масиві users і другу middleware /login чи користувач ввів всі data

const express = require("express");
const {engine} = require("express-handlebars");
const path = require("path");

const apiRoutes = require("./route/apiRoutes");

const app = express();

// Default setup
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "static")));

// Engine setup
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

// Routes setup
app.use(apiRoutes);

const PORT = 5200;
app.listen(PORT, () => console.log(`Server has been started on PORT ${PORT}...`));