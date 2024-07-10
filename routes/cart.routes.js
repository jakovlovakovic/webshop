const express = require("express");
const router = express.Router();

router.get("/add/:id", (req, res) => {
    // dobi productId
    const productId = req.params.id;

    // provjeri postoji li cart u sessionu
    if (!req.session.cart) {
        req.session.cart = {};
    }

    // ako je product vec u cartu, uvecaj kolicinu
    if (req.session.cart[productId]) {
        req.session.cart[productId]++;
    } else {
        // inace stavi kolicinu na 1
        req.session.cart[productId] = 1;
    }

    // izracunaj total count itema u cartu
    req.session.totalCount = Object.values(req.session.cart).reduce((a, b) => a + b, 0);

    // vrati json
    res.json({ cart: req.session.cart, totalCount: req.session.totalCount });
});

router.get("/remove/:id", (req, res) => {
    // dobi product id
    const productId = req.params.id;

    // provjeri postoji li cart
    if (req.session.cart && req.session.cart[productId]) {
        // smanji kolicinu u cartu za productId
        req.session.cart[productId]--;

        // ako je kolicina 0 ili manje, makni product iz carta
        if (req.session.cart[productId] <= 0) {
            delete req.session.cart[productId];
        }
    }

    // izracunaj total count itema u cartu
    req.session.totalCount = Object.values(req.session.cart).reduce((a, b) => a + b, 0);

    // vrati json
    res.json({ cart: req.session.cart, totalCount: req.session.totalCount });
});

router.get("/getAll", (req, res) => {
    // renderiraj cart page s podacima iz sessiona
    res.render('cart', { cart: req.session.cart });
});

router.get('/', (req, res) => {
    // odmah redirectaj na /cart/getAll
    res.redirect('/cart/getAll');
});

module.exports = router;