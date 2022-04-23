const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const initializePassport  = require('./passport-config')
const flash = require('express-flash')
const session = require('express-session')
const db = require('./database.js')
const methodOverride = require('method-override')
const { io } = require('socket.io-client')

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
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/html', express.static(__dirname + 'public/html'))
app.use('/lib', express.static(__dirname + 'public/lib'))

//Routing Targets
app.get('/', (req, res) => {
    res.render('login.ejs')
})

app.get('/homepage', checkAuthenticated,(req, res) => {
    res.render('homepage.ejs', { username: req.user.username })
})

app.get('/create', checkAuthenticated, (req, res) => {
    res.render('create.ejs', { username: req.user.username})
})

app.get('/join', checkAuthenticated, (req, res) => {
    res.render('join.ejs', { username: req.user.username })
})

app.get('/statistics', checkAuthenticated, (req, res) => {
    res.render('statistics.ejs', { username: req.user.username })
})
app.get('/createbotgame', checkAuthenticated, checkBotgame)

app.get('/botgame', checkAuthenticated, (req, res) => {
    res.render('botgame.ejs', { username: req.user.username })
})

app.get('/leaderboard', checkAuthenticated, (req, res) => {
    res.render('leaderboard.ejs', { username: req.user.username })
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

app.get('/chessgame', checkAuthenticated, (req, res) => {
    res.render('chessgame.ejs', { username: req.user.username })
})

app.post('/loginsubmit', passport.authenticate('local',{
    successRedirect: '/homepage',
    failureRedirect: '/',
    failureFlash: true
}))

app.post('/joinchessgame', checkAuthenticated, (req, res) => {
    res.render('chessgame.ejs', { username: req.user.username })
})

app.post('/registersubmit', async (req, res) =>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        db.checkUserByNameAndMail(req.body.username, req.body.email, hashedPassword, function(data, name, email, pw){
            if (data != null) return
            db.setUser(
                name,
                pw,
                email
            );
        })
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

app.post('/createbotgame', async (req, res) =>{
    try{
        db.createBotgame(req.user.id, "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR", "")
        res.redirect('/botgame')
    } catch (e){    
        res.redirect('/homepage')
    }
})

app.post('/creategame', async (req, res) => {
    try{    
        db.createGame(req.user.id, "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR", "", req.body.socketid, req.body.public)
    } catch (e){
    }
})

app.post('/getbotgame', async (req, res) => {
    try{
        db.getBotgame(req.user.id, function(data){
            res.send(data)
        })
    } catch (e){    
        res.redirect('/homepage')
    }
})

app.post('/updatebotgame', async (req, res) => {
    try{
        db.updateBotgame(req.body.gameid, req.body.board, req.body.moves)
    } catch (e){    
        res.redirect('/homepage')
    }
})

app.post('/changecredentials', async (req, res) => {
    try{
        await changeCredentials(req, res)

        req.logOut()
        res.redirect('/')
    } catch (e){    
        console.log(e)   
    }
})

app.post('/gettopplayer', async (req, res) => {
    try{
        db.getTopPlayer(function(data){
            res.send(data)
        })
    } catch (e){    
        res.redirect('/homepage')
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

function checkBotgame(req, res){
    db.getBotgame(req.user.id, function(data){
        if (data != null){
            res.redirect('/botgame')
        }
        else
            res.render('createbotgame.ejs', { username: req.user.username })
    })    
}

async function changeCredentials(req, res){
    if(req.body.newpassword != ''){
        db.updateUser( req.user.id, null, await bcrypt.hash(req.body.newpassword, 10), null);
    }

    if(req.body.newusername != ''){
        db.checkUserByName(req.body.newusername, req.user.id, function(data, id, name){
            if (data != null) return
            db.updateUser(id, name, null, null);
        })
    }

    if(req.body.newemail != ''){
        db.ckeckUserByMail(req.body.newemail, req.user.id, function(data, id, mail){
            if (data != null) return
            db.updateUser( id, null, null, mail);
        })
    }
}

module.exports = app;