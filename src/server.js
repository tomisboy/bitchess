const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const initializePassport  = require('./passport-config')
const flash = require('express-flash')
const session = require('express-session')
const db = require('./database.js')
const methodOverride = require('method-override')

require('dotenv').config();

app.set('view-engine' , 'ejs')

initializePassport (passport)

//Static Files
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_PWD,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

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

app.get('/homepage', checkAuthenticated,(req, res) => {
    res.render('homepage.ejs', { username: req.user.username })
})

app.get('/create', checkAuthenticated, (req, res) => {
    res.render('create.ejs', { username: req.user.username })
})

app.get('/join', checkAuthenticated, (req, res) => {
    res.render('join.ejs', { username: req.user.username })
})

app.get('/statistics', checkAuthenticated, (req, res) => {
    res.render('statistics.ejs', { username: req.user.username })
})

app.get('/joinpublic', checkAuthenticated, (req, res) => {
    res.render('joinpublic.ejs', { username: req.user.username })
})

app.get('/joinprivate', checkAuthenticated, (req, res) => {
    res.render('joinprivate.ejs', { username: req.user.username })
})

app.get('/profile', checkAuthenticated, (req, res) => {
    res.render('profile.ejs', { username: req.user.username })
})

//Post-Methods
app.post('/loginsubmit', passport.authenticate('local',{
    successRedirect: '/homepage',
    failureRedirect: '/',
    failureFlash: true
}))

app.post('/creategame', async (req, res) => {
    console.log('/creategame request')
})

app.post('/registersubmit', async (req, res) =>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        db.setUser(
            req.body.username,
            hashedPassword,
            req.body.email
        );
        res.redirect('/')
    } catch (e){    
        res.redirect('/')
    }
})

app.post('/deleteuser', async (req, res) =>{
    try{
        var userid = req.user.id

        req.logOut()
        db.deleteUser(userid);

        res.redirect('/')
    } catch (e){    
        res.redirect('/')
    }
})

app.post('/changecredentials', async (req, res) => {
    try{
        if(req.body.newpassword != ''){
            db.updateUser( req.user.id, null, await bcrypt.hash(req.body.newpassword, 10), null);
        }

        if(req.body.newusername != ''){
            db.updateUser( req.user.id, req.body.newusername, null, null);
        }

        if(req.body.newemail != ''){
            db.updateUser( req.user.id, null, null, req.body.newemail);
        }

        req.logOut()
        res.redirect('/')
    } catch (e){    
        console.log(e)   
    }
})

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})

function checkAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated){
        return res.redirect('/')
    }
    next()
}