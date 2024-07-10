const express = require("express");
const router = express.Router();

// kategorije
let categories;

router.get('/getCategories', (req, res) => {
    // dobi podatke
    const { data } = require('../data/mydata.js');
    categories = data.categories;

    // dobi kategoriju koju ces koristiti za renderanje
    const category = categories.find(c => c.name === "Ruksaci");

    // provjeri postoji li cart u sessionu
    if (!req.session.cart) {
        req.session.cart = {};
    }

    // izracunaj total count itema u cartu
    req.session.totalCount = Object.values(req.session.cart).reduce((a, b) => a + b, 0);

    // renderaj home.ejs sa svim kategorijama, cartom, i total countom
    res.render('home', { categories: categories, category: category, cart: req.session.cart, totalCount: req.session.totalCount });
});

router.get('/', (req, res) => {
    // odmah redirectaj na /home/getCategories (da dobis data i renderas pocetnu stranicu)
    res.redirect('/home/getCategories');
});

router.get('/getProducts/:id', (req, res) => {
    // dobi id kategorije i pronadji objekt category za taj id
    const categoryName = req.params.id;
    const category = categories.find(c => c.name === categoryName);

    // displayjaj category s dobivenim id-em
    req.session.totalCount = Object.values(req.session.cart).reduce((a, b) => a + b, 0);

    // vrati renderirani home.ejs
    res.render('home', { categories: categories, category: category, cart: req.session.cart, totalCount: req.session.totalCount });
});

module.exports = router;