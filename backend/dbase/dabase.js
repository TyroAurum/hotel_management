require('dotenv').config();
const mysql = require('mysql')


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CREATE INVENTORY DATABASE

const database = mysql.createConnection({
    host: `${process.env.PORT_NO}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASS}`
  });

  database.connect((err) => {
    if (err) throw err;
    database.query('CREATE DATABASE IF NOT EXISTS hotelPandyan', (err, result) => {
      if (err) throw err;
    database.query('CREATE TABLE IF NOT EXISTS `hotelPandyan`.`inventory` (`id` VARCHAR(6) NOT NULL , `name` VARCHAR(20) NOT NULL , `price` INT(5) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;',(err, result) =>{
      if (err) throw err;
    })
    database.query('CREATE TABLE IF NOT EXISTS `hotelPandyan`.`kitchen` (`id` VARCHAR(6) NOT NULL , `date` DATE NOT NULL , `name` VARCHAR(20) NOT NULL , `stock` INT(5) NOT NULL , `production` INT(5) NOT NULL,`totalproduced` INT(5), PRIMARY KEY (`id`)) ENGINE = InnoDB;',(err, result) =>{
      if (err) throw err;
    })
    database.query('CREATE TABLE IF NOT EXISTS `hotelPandyan`.`billed` (`id` INT NOT NULL AUTO_INCREMENT , `date` DATE NOT NULL , `items` JSON NOT NULL , `price` INT(10) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;',(err, result) =>{
      if (err) throw err;
    })
      console.log('Inventory connected');
    });
    
  });


  module.exports = {
    database
  }