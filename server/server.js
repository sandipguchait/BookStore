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

//GET request

//POST request
app.post('/book/new', (req, res)=> {
    const book = new Book(req.body)
    book.save((err, doc)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            bookId: doc._id
        })
    })
})
//UPDATE request

//DELETE request



const port = process.env.PORT || 3001
app.listen(port, ()=> {
    console.log(`SERVER Running on ${port}`)
})


