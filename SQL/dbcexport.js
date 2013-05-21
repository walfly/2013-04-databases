var mysql = require('mysql');

// var connection = mysql.createConnection({
//   user: "root",
//   //password: "",
//   database: "chat"
// });
// connection.connect();

// module.exports = connection;

module.exports = mysql.createConnection({
  user: "root",
  //password: "",
  database: "chat"
});