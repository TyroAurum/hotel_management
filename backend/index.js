const express = require('express');
const { database } = require('./dbase/dabase');
require('dotenv').config();
const cors = require('cors');

const app = express();


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.post('/addinventory',(req,res)=>{
  var fid = req.body.id;
  var name = req.body.name;
  var price = req.body.price;
  database.query('INSERT INTO hotelpandyan.inventory (id, name, price) VALUES (?, ?, ?)', [fid, name, price],function(err){
    if (err) {
      res.send(err)
    }  })
 
})

app.get('/getinventory/:id',async (req,res)=>{
  const fid = req.params.id;
  await database.query('SELECT * FROM hotelpandyan.inventory WHERE id = ?',[fid],function(err,result){
    if(err) throw err;
    else {
      res.send(result[0])
    }
  })  
})




app.post('/addproduction',(req,res)=>{
  const fid = req.body.id;
  const value = req.body.value;
  const recipe = req.body.name;
  var today = new Date().toISOString().split('T')[0]
  const qry1 = "INSERT INTO hotelpandyan.kitchen (id, date, name, production,totalproduced) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE production = IF(name = ? AND date = ?, production + ?, production) , totalproduced = IF(name = ? AND date = ?,totalproduced + ?, totalproduced) "
  var values = [fid,today,recipe,value,value,recipe,today,value,recipe,today,value]
  database.query(qry1,values,function(err){
    if (err){
      res.send(err)
    }
  })})

app.get('/getproduction',async (req,res)=>{
  await database.query(`SELECT * FROM hotelpandyan.kitchen Where totalproduced > 0 `,function(err,result){
    if (err) throw err;
    else {
      res.send(result)
    }
  })
})

app.put('/pullstock',async (req,res)=>{
  const fid = req.body.id;
  const value = req.body.value;
  var today = new Date().toISOString().split('T')[0]
  const qry2 = "UPDATE hotelpandyan.kitchen SET stock = stock + ? , production = production - ? WHERE id = ? AND date = ? "
  const values2 = [value,value,fid,today]
  await database.query(qry2,values2,function(err){
    if(err) {
      res.send(err)
    }
  })
})

app


app.put('/updatestock',async (req,res)=>{
  const fid = req.body.id;
  const value = req.body.value;
  var today = new Date().toISOString().split('T')[0]
  const qry3 = "UPDATE hotelpandyan.kitchen SET stock = stock - ? WHERE id = ? AND date = ?"
  const values3 = [value,fid,today]
  await database.query(qry3,values3,function(err){
    if(err) {
      res.send(err)
    } })
})

app.post('/billedlist',async (req,res)=>{
  const items = req.body.params.items;
  const price = req.body.params.price;
  const insitem = JSON.stringify(Object.assign({},items));
  var today = new Date().toISOString().split('T')[0]
  const qry4 = "INSERT INTO hotelpandyan.billed (date, items, price) VALUES (?, ?, ?)"
  const values4 = [today,insitem,price]
  await database.query(qry4, values4, function(err){
    if (err) {
      res.send(err)
    }})
})


app.get('/getbilledlist',async (req,res)=>{
  await database.query(`SELECT * FROM hotelpandyan.billed`,function(err,result){
    if(err) throw err;
    else {
      res.send(result)
    }
  })
})

app.listen(5000,`${process.env.PORT_NO}`);