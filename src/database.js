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
  //gets user by email
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
  //gets user by id
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
  //sets new user
  setUser: function(username, password, email){  
    try{
      var con = mysql.createConnection(dbconfig);
      con.connect()
      con.query("INSERT INTO users (username, password, email, rating) VALUES (?,?,?,?)", [username, password, email, 800], function (err, result){
          if (err) throw err;
      })
      con.end()
    } catch (e) {
        console.log(e)
    }
  },
  //updates user by id
  updateUser: function(id, username, password, email){  
    try{
      var con = mysql.createConnection(dbconfig);
      con.connect()

      if(username != null){
        con.query("UPDATE users SET username = ? WHERE id = ?", [username, id], function (err, result){
          if (err) throw err;
        })
      }
      else if(password != null){
        con.query("UPDATE users SET password = ? WHERE id = ?", [password, id], function (err, result){
          if (err) throw err;
        })
      }
      else if(email != null){
        con.query("UPDATE users SET email = ? WHERE id = ?", [email, id], function (err, result){
          if (err) throw err;
        })
      }
      con.end()
    } catch (e) {
        console.log(e)
    }
  },
  deleteUser: function(id){
    try{
      var con = mysql.createConnection(dbconfig);
      con.connect()
      con.query("DELETE FROM users WHERE id = ?", [id], function (err, result){
        if (err) throw err;
      })

      con.end()
    } catch (e) {
        console.log(e)
    }
  }
}