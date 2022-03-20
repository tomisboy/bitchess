var mysql = require('mysql');
var db = require("./database.js")
require('dotenv').config();


var con = mysql.createConnection({
     host: process.env.DB_HOST, 
     user:'root', 
     password: process.env.DB_PASSWORD,
     database: 'bitchess',
     connectionLimit: 5
});

con.connect((err) => {
    if (err) {
      console.log("Error occurred", err);
    } else {
      console.log("Connected to MySQL Server");
    }
});

module.exports = {
  getUser: function(email, callback){
    try{
        con.query("SELECT * FROM users WHERE email = ?", [email], function (err, result) {
            if (err) throw err; 
            callback(result[0])        
        })
    } catch {          
            callback(null);      
    }  
  },
  getUserById: function(id, callback){
    try{
        con.query("SELECT * FROM users WHERE id = ?", [id], function (err, result) {
            if (err) throw err; 
            callback(result[0])        
        })
    } catch {          
            callback(null);      
    }  
  },
  setUser: function(username, password, email){  
    try{
        con.query("INSERT INTO users (username, password, email) VALUES (?,?,?)", [username, password, email], function (err, result){
            if (err) throw err;
            }); 
    } catch (e) {
        console.log(e)
    }
  }
} 