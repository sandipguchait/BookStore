const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV)

mongoose.connect(config.DATABASE , { useNewUrlParser: true })
.then(console.log("CONNECTED to database"))
.catch(error => console.log(error))

// Bringing models from Models
const { User } = require('./models/user');
const { Book } = require('./models/book');

//From Middleware
const { auth } = require('./middleware/auth');

// app initialization starts here
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

//GET request to find a book with id
app.get('/api/book', (req, res)=>{
    let id = req.query.id;
    Book.findById(id, (err, doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc)
    })
})

//   GET REQUEST //////////////////////////////////////////////////////////////////////////////////////////////////
// GET request to find a book by sort,limit,and skip values inside the url
app.get('/api/books',(req,res)=> {
    //localhost:3001/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    //ORDER = asc || desc
    Book.find().skip(skip).sort({_id: order}).limit(limit).exec((err, doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc)
    })
});

// GETTING DETAILS ABOUT The reviewer
app.get('/api/reviewer',(req,res)=>{
    let id = req.query.id;
    User.findById(id, (err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            email: doc.email,
            firstname: doc.firstname,
            lastname: doc.lastname
        })
    })
});

// GETTING ALL USERS FROM DATABASE
app.get('/api/users',(req,res)=>{
    User.find({},(err, users)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(users)
    })
});

// GETTING ALL BOOK written by a BOOK OWNER using OWNER ID
app.get('/api/user_posts',(req,res)=>{
    Book.find({ownerId: req.query.user}).exec((err, docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs)
    })
});

// CHECK USER LOGGED IN OR NOT || if logged in then can access certain routes
app.get('/api/auth', auth, (req, res)=>{
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname
    })
})
// LOGOUT FEATURE USING AUTH MIDDLEWARE
app.get('/logout', auth,(req,res)=>{
    req.user.deleteToken(req.token, (err, user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200)
    })
})

// POST REQUEST ////////////////////////////////////////////////////////////////////////////////////////////
app.post('/api/book/new', (req, res)=> {
    const book = new Book(req.body)
    book.save((err, doc)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            bookId: doc._id
        })
    })
});

// REGISTER USER
app.post('/api/register',(req,res)=>{
    const user = new User(req.body)
    user.save((err, doc)=>{
        if(err) return res.json({ success: false });
        res.status(200).json({
            success: true,
            user: doc
        })
    })
});

//  LOGIN USER 
app.post('/api/login',(req,res)=>{
    User.findOne({'email': req.body.email }, (err, user)=>{
        if(!user) return res.json({ 
            isAuth: false ,
            message: 'Email not found'
        });
        // Comparing password with the Database password
        user.comparePassword(req.body.password,(err, isMatch)=>{
            if(!isMatch) return res.json({
                isAuth: false,
                message:'Wrong Password'
            });
            // IF password mathes then we set a token/cookie to get access to it on Client side
            user.generateToken((err, user)=>{
                if(err) return status(400).send(err);
                res.cookie('auth', user.token ).json({
                    isAuth: true,
                    id: user._id,
                    email: user.email
                })
            })
        })
    })
})



//  UPDATE REQUEST //////////////////////////////////////////////////////////////////////////////////////////////////
app.patch('/api/book/update',(req,res)=>{
    Book.findByIdAndUpdate(req.body._id, req.body, { new: true },(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    })
})


//  DELETE REQUEST //////////////////////////////////////////////////////////////////////////////////////////////////
app.delete('/api/book/delete',(req,res)=>{
    let id = req.query.id;
    Book.findByIdAndRemove(id,(err, doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            success: true
        })
    })
})



//SERVER RUNNING PORT
const port = process.env.PORT || 3001
app.listen(port, ()=> {
    console.log(`SERVER Running on ${port}`)
})


