const express = require('express')
const app = express()
require('dotenv').config();
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
var connected = "no"




var mysql = require('mysql');
var con = mysql.createConnection({
     host: process.env.DB_HOST, 
     user:'root', 
     password: process.env.DB_PASSWORD,
     connectionLimit: 5
});

con.connect(function(err) {
    if (err) throw err;
    console.log("You are connected!");
    connected = "yes you are connected"
  });
con.end();
 



app.set('view-engine' , 'ejs')
app.listen(3000)

app.get('/', (req, res) => {
    res.render('index.ejs')
})


app.get('/connected', (req, res) => {
res.render('connected.ejs', {connected: connected}
  )
})

app.get('/login', (req, res) => {

    res.render('login.ejs')
})




app.get('/register', (req, res) => {
    res.render('register.ejs')
})
