var mysql = require('mysql');
var db = require("./database.js")
require('dotenv').config();


var con = mysql.createConnection({
     host: process.env.DB_HOST, 
     user:'root', 
     password: process.env.DB_PASSWORD,
     connectionLimit: 5
});

module.exports = {
  getUser: function(id){
    
  },
  setUser: function(username, password, email){
    
  }
}