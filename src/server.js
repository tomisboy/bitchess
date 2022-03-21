const express = require('express')
const app = express()
require('dotenv').config();

app.set('view-engine' , 'ejs')

//Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/scss', express.static(__dirname + 'public/scss'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

//Open Port
app.listen(3000)

//Routing Targets
app.get('/', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.get('/homepage', (req, res) => {
    res.render('homepage.ejs')
})

app.get('/create', (req, res) => {
    res.render('create.ejs')
})

app.get('/join', (req, res) => {
    res.render('join.ejs')
})

app.get('/statistics', (req, res) => {
    res.render('statistics.ejs')
})

app.get('/createpublic', (req, res) => {
    res.render('createpublic.ejs')
})

app.get('/createprivate', (req, res) => {
    res.render('createprivate.ejs')
})

app.get('/joinpublic', (req, res) => {
    res.render('joinpublic.ejs')
})

app.get('/joinprivate', (req, res) => {
    res.render('joinprivate.ejs')
})

//Post-Methods
app.post('/loginsubmit', function (req, res) {
    console.log(req.body)
    res.redirect('/bla')
})

app.post('/registersubmit', function (req,res) {
    console.log(req.body)
    res.redirect('/bla')
})
