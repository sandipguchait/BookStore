const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV)

mongoose.connect(config.DATABASE , { useNewUrlParser: true })
.then(console.log("CONNECTED to database"))
.catch(error => console.log(error))

// Bringing models from Models
const { User } = require('./models/user');
const { Book } = require('./models/book');
// app initialization starts here
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());




const port = process.env.PORT || 3001

app.listen(port, ()=> {
    console.log(`SERVER Running on ${port}`)
})


