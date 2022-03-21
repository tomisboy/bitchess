var mysql = require('mysql');
var db = require("./database.js")
require('dotenv').config();

var dbconfig = {
  host: process.env.DB_HOST, 
  user:'root', 
  password: process.env.DB_PASSWORD,
  database: 'bitchess',
  connectionLimit: 5
}

module.exports = {
  getUser: function(email, callback){
    try{
      var con = mysql.createConnection(dbconfig);
      con.connect()
      con.query("SELECT * FROM users WHERE email = ?", [email], function (err, result) {
        if (err) throw err; 
        callback(result[0])        
      })
      con.end()
    } catch {          
            callback(null);      
    }  
  },
  getUserById: function(id, callback){
    try{
        var con = mysql.createConnection(dbconfig);
        con.connect()
        con.query("SELECT * FROM users WHERE id = ?", [id], function (err, result) {
            if (err) throw err; 
            callback(result[0])        
        })
        con.end()
    } catch {          
            callback(null);      
    }  
  },
  setUser: function(username, password, email){  
    try{
      var con = mysql.createConnection(dbconfig);
      con.connect()
      con.query("INSERT INTO users (username, password, email) VALUES (?,?,?)", [username, password, email], function (err, result){
          if (err) throw err;
      })
      con.end()
    } catch (e) {
        console.log(e)
    }
  }
}