/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */


/* These headers will allow Cross-Origin Resource Sharing.
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var url = require('url');
var fs = require('fs');
var dbConnection = require('./dbcexport.js');
var querystring = require('querystring');

var Sequelize = require('sequelize');
var sequelize = new Sequelize("chat", "root");
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = sequelize.define('User', {
  username: Sequelize.STRING,
  message: Sequelize.STRING,
  roomname: Sequelize.STRING
});

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
User.sync();


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};


module.exports.handleRequest = function(request, response) {
  var req_url = url.parse(request.url);
  var method = request.method;

  console.log("Serving request type " + method + " for url " + req_url);

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/json";
  if (method === 'OPTIONS') {
    response.writeHead(200, headers);
    // Options request only requires headers, no body
    response.end();
  } else if (method === "GET"){
    // Return all the messages here
    User.findAll().success(function(results){
      response.writeHead(200, headers);
      response.end(JSON.stringify({'results' : results}));
    });
  } else if (method === "POST"){
    // Stores some data coming from the client
    var data = '';
    response.writeHead(201, headers);
    request.on('data', function(fields){
      data += fields.toString();
    });
    request.on('end', function(){
      var message = JSON.parse(data);
      message.roomname = message.roomname || null;
      var newUser = User.build(message);
      newUser.save().success(function(results){
        response.end(JSON.stringify({ message: 'Ok!' }));
      // Store the message
      });
    });
  }
};