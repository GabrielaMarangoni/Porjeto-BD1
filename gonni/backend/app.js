var express = require('express')
var port = 3000
var app = express()

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gonni'
  });
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });
  
  
app.get('/', function(req, res) {
    res.json({status: 'Server is running!'})
})

app.get('/api/users', function(req, res) {
    console.log("OPA1")
})

app.post('/api/users', function(req, res) {
    console.log("OPA2")
    console.log(req.body);      // your JSON
    console.log(res.body);      // your JSON
})

app.listen(port, function() {
    console.log(`Server is running at localhost:${port}`)
}) 



