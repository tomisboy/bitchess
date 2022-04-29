var mysql = require('mysql');
var db = require("./database.js")
require('dotenv').config();

var dbconfig = {
  host: process.env.DB_HOST, 
  user:'root', 
  password: process.env.DB_PASSWORD,
  database: 'bitchess',
  connectionLimit: 10000
}

module.exports = {
  // -----------------------------
  // USERS
  // -----------------------------
  //gets user by email
  getUserByMail: function(email, callback){
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
  //gets user by mail
  getUserByName: function(name, callback){
    try{
      var con = mysql.createConnection(dbconfig);
      con.connect()
      con.query("SELECT * FROM users WHERE username = ?", [name], function (err, result) {
        if (err) throw err;
        callback(result[0])        
      })
      con.end()
    } catch (e) {  
        callback(null);      
    }  
  },
  //checks if email exists - gets id from session user
  checkUserByMail: function(email, id, callback){
    try{
      var con = mysql.createConnection(dbconfig);
      con.connect()
      con.query("SELECT * FROM users WHERE email = ?", [email], function (err, result) {
        if (err) throw err; 
        callback(result[0], id, email)        
      })
      con.end()
    } catch {          
            callback(null, id, email);      
    }  
  },
  //checks if name exists - gets id from session user
  checkUserByName: function(name, id, callback){
    try{
      var con = mysql.createConnection(dbconfig);
      con.connect()
      con.query("SELECT * FROM users WHERE username = ?", [name], function (err, result) {
        if (err) throw err;
        callback(result[0], id, name)        
      })
      con.end()
    } catch (e) {  
        callback(null, id, name);      
    }  
  },
  //checks if name or mail exists - gets id from session user
  checkUserByNameAndMail: function(name, email, pw, callback){
    try{
      var con = mysql.createConnection(dbconfig);
      con.connect()
      con.query("SELECT * FROM users WHERE username = ? OR email= ?", [name, email], function (err, result) {
        if (err) throw err;
        callback(result[0], name, email, pw)        
      })
      con.end()
    } catch (e) {  
        callback(null, name, email, pw);
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
  },
  // -----------------------------
  // Games
  // -----------------------------
  createGame: function(playerid, board, moves, socketid, public){
    try{
      var con = mysql.createConnection(dbconfig);
      con.connect()
      con.query("INSERT INTO games (playerone, board, moves, date, socketid, public) VALUES (?,?,?,?,?,?)", [playerid, board, moves, Date.now(), socketid, public], function (err, result){
        if (err) throw err;
      })

      con.end()
    } catch (e) {
        console.log(e)
    }
  },
  eloupdate: function(playerwon, playerlost){
    try{
      var con = mysql.createConnection(dbconfig);
      con.connect()
      con.query("UPDATE users SET rating = rating + 30 WHERE id = ?", [playerwon] , function (err, result){
        if (err) throw err;
  
      }),
      con.query("UPDATE users SET rating = rating - 30 WHERE id = ?", [playerlost] , function (err, result){
        if (err) throw err;
      })
      con.end()
    } catch (e) {
      console.log(e)
    }
  },





  // -----------------------------
  // BOTGAMES
  // -----------------------------
  createBotgame: function(playerid, board, moves){
    try{
      var con = mysql.createConnection(dbconfig);
      con.connect()
      con.query("INSERT INTO botgames (playerid, board, moves) VALUES (?,?,?)", [playerid, board, moves], function (err, result){
        if (err) throw err;
      })

      con.end()
    } catch (e) {
        console.log(e)
    }
  },
  updateBotgame: function(gameid, board, moves){
    try{
      var con = mysql.createConnection(dbconfig);
      con.connect()
      con.query("UPDATE botgames SET board = ?, moves = ? WHERE id = ?", [board, moves, gameid], function (err, result){
        if (err) throw err;
      })
      con.end()
    } catch (e) {
        console.log(e)
    }
  },
  getBotgame: function(playerid, callback){
    try{
      var con = mysql.createConnection(dbconfig);
      con.connect()
      con.query("SELECT * FROM botgames WHERE playerid = ?", [playerid], function (err, result){
        if (err) throw err;
        callback(result[0])
      })
      con.end()
    } catch (e) {
        callback(null)
    }
  },
  // -----------------------------
  // STATISTICS
  // -----------------------------
  getTopPlayer: function(callback){
    try{
      var con = mysql.createConnection(dbconfig);
      con.connect()
      con.query("SELECT username, rating FROM users ORDER BY rating DESC LIMIT 100", function (err, result){
        if (err) throw err;
        callback(result)
      })
      con.end()
    } catch (e) {
        callback(null)
    }
  },
}