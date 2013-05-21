-- CREATE DATABASE chat;

-- USE chat;

CREATE TABLE messages (
  objectID tinyint(5) AUTO_INCREMENT,
  username varchar(20),
  message varchar(200),
  roomname varchar(20),
  PRIMARY KEY (objectID)
);

/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
