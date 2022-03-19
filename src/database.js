var mysql = require('mysql');
require('dotenv').config();

var con = mysql.createConnection({
     host: process.env.DB_HOST, 
     user:'root', 
     password: process.env.DB_PASSWORD,
     connectionLimit: 5
});

module.exports = {
  getUser: function(id){
    connection.query('SELECT * FROM accounts WHERE id = ?', [id], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) 
        throw error;

      if (results.length > 0)
        return results;
      else 
        return 0;
		});
  },
  setUser: function(username, password, email){
    
  }
}