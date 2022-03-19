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

/*app.get('/login', (req, res) => {
    res.render('login.ejs')
})*/

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.get('/bla', (req, res) =>{
    res.render('bla.ejs')
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