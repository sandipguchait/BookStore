const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

mongoose.connect()



const app = express();


const port = process.env.PORT || 3001

app.listen(port, ()=> {
    console.log(`SERVER Running on ${port}`)
})


