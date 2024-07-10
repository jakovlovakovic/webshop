const express = require("express");
const path = require('path');
const app = express();
const session = require('express-session');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'Jakov-Lovakovic-Drugi-Web-Labos',
    resave: false,
    saveUninitialized: false
}))
app.set("view engine", "ejs");

const homeRouter = require("./routes/home.routes");
const cartRouter = require("./routes/cart.routes");

app.use((req, res, next) => {
    res.setHeader("Cache-Control", 'no-store,no-cache');
    next();
});

app.use("/home", homeRouter);
app.use("/cart", cartRouter);

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.listen(3000);