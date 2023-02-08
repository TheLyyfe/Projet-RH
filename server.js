const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const entrepriseRouter = require('./routes/entrepriseRouter.js')
const employeeRouter = require('./routes/employeeRouter.js')
require('dotenv').config()


const db = process.env.BDD_URL
const app = express()

app.use(express.static('./assets'));
app.use(session({secret: "TONMDP",saveUninitialized: true,resave: true}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(entrepriseRouter)
app.use(employeeRouter)

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Je suis connecté');
    }
})

mongoose.set('strictQuery', true);
mongoose.connect(db, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("connecter a la bdd");
    }
})













