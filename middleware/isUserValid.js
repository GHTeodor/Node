function isUserValid(req, res, next) {
    try {
        const {firstName, lastName, email, password, age, city} = req.body;

        if (!firstName || !lastName || !email || !password || !age || !city)
            throw new Error('All fields must be not empty');

        next();
    } catch ({message}) {
        console.log(message);
        res.status(400).send(message);
    }
}

module.exports = isUserValid;