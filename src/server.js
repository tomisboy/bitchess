const express = require('express')
const app = express()
require('dotenv').config();
var path = require('path');


const mongoose = require('mongoose')





app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))



app.set('view-engine' , 'ejs')
app.listen(3000)

app.get('/', (req, res) => {
    res.render('index.ejs')
})



app.get('/login', (req, res) => {
    res.render('login.ejs')
})


app.get('/register', (req, res) => {
    res.render('register.ejs')
})
