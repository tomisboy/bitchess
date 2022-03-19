var db = require('./database.js');

function tryLogin(email, password){
    var res = db.getUser("jonas@gmail.com, jonas");
    console.log(res);
}