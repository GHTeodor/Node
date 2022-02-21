class SingInController {
    renderSingIn(req, res) {
        res.render('singIn');
    }

    wrongSingIn({user}, res) {
        res.redirect(`/users/${user}`);
    }
}

module.exports = new SingInController();