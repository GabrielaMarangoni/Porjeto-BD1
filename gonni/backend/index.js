var express = require('express')
var port = 3000
var app = express()
var mysql=require('mysql');


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());


const connection = mysql.createConnection({
    host: '172.17.0.1',
    user: 'root2',
    password: 'root2',
    database: 'gonni',
    port: 3306
 });

connection.connect(function(error){
    if(!!error){
        console.log(error);
    }else{
        console.log('Connected!:)');
    }
})

app.get('/', function(req, res) {
    // SE NAO EXISTIR, CRIAR A TABELA SORVETE
    var sql_create = "CREATE TABLE IF NOT EXISTS sorvete (idSorvete int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, sabor varchar(200) DEFAULT NULL, descricao varchar(200) DEFAULT NULL, lote int(255) NULL, precoUnitario decimal(9,2) DEFAULT NULL)";
    connection.query(sql_create, function (err, result) {
    if (err) throw err;
    console.log("Table created");
    });
 
    res.json({status: 'Server is running!'})
    
})

// POST /api/users/editar -> Editar um usuário
app.post('/api/users/actions/editar', function(req, res) {
    let keys = Object.keys(req.body);
    let register = keys[0];

    let nome = JSON.parse(register).nome;
    let email = JSON.parse(register).email;
    let cpf = JSON.parse(register).cpf;
    let telefone = JSON.parse(register).telefone;
    let endereco = JSON.parse(register).endereco;

    var sql = "UPDATE users SET nome='"+nome+"', telefone='"+telefone+"', endereco='"+endereco+"', email='"+email+"' WHERE cpf = '"+cpf+"'";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records edited: " + result.affectedRows);
    });

    res.json("ok");
})

// POST /api/users/excluir -> excluir um usuário
app.post('/api/users/actions/excluir', function(req, res) {
    let keys = Object.keys(req.body);
    let register = keys[0];
    let register_CPF = JSON.parse(register).cpf;

    let sql = "DELETE FROM users WHERE cpf = '"+register_CPF+"'";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
    });

    res.json("ok");
})

// POST /api/users/excluir -> excluir sorvete
app.post('/api/sorvete/actions/excluir', function(req, res) {
    let keys = Object.keys(req.body);
    let register = keys[0];
    console.log(register);
    let register_ID = JSON.parse(register).idSorvete;

    let sql = "DELETE FROM sorvete WHERE idSorvete = '"+register_ID+"'";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
    });

    res.json("ok");
})


// POST /api/users -> buscar usuario pelo nome
app.post('/api/users/actions/buscar', function(req, res) {
    res.header("Content-Type",'application/json');
    let keys = Object.keys(req.body);
    let nome = keys[0];
    console.log("BUSCA")
    console.log(nome)

    connection.query("SELECT * FROM users WHERE nome LIKE '%"+nome+"%'", function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
    
})

// POST /api/sorvete -> buscar sorvete pelo nome
app.post('/api/sorvete/actions/buscar', function(req, res) {
    res.header("Content-Type",'application/json');
    let keys = Object.keys(req.body);
    let nome = keys[0];
    console.log("BUSCA")
    console.log(nome)

    connection.query("SELECT * FROM sorvete WHERE sabor LIKE '%"+nome+"%'", function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
    
})



// GET /api/users -> Lista os usuarios
app.get('/api/users', function(req, res) {
    res.header("Content-Type",'application/json');
    connection.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
})

// GET /api/users -> Lista os sorvetes
app.get('/api/sorvete', function(req, res) {
    res.header("Content-Type",'application/json');
    connection.query("SELECT * FROM sorvete", function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
})

// POST /api/sorvete -> insere novo usuário
app.post('/api/users/actions/cadastrar', function(req, res) {
    let keys = Object.keys(req.body);
    let register = keys[0];

    let nome = JSON.parse(register).nome;
    let email = JSON.parse(register).email;
    let cpf = JSON.parse(register).cpf;
    let telefone = JSON.parse(register).telefone;
    let endereco = JSON.parse(register).endereco;
    let pass1 = JSON.parse(register).pass1;

    // SE NAO EXISTIR, CRIAR A TABELA USERS
    var sql_create = "CREATE TABLE IF NOT EXISTS users (nome VARCHAR(255), cpf VARCHAR(255) PRIMARY KEY, telefone VARCHAR(255), endereco VARCHAR(255), email VARCHAR(255), pass1 VARCHAR(255))";
    connection.query(sql_create, function (err, result) {
    if (err) throw err;
    console.log("Table created");
    });

    // INSERIR O REGISTRO NA TABELA USERS COM OS CAMPOS VINDOS DO FRONTEND
    let sql_intro = `INSERT INTO users(nome,cpf,telefone,endereco,email,pass1)  VALUES ?  `;
    let registro = [[nome, cpf, telefone, endereco, email, pass1]];
    connection.query(sql_intro, [registro], (err, results) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Row inserted:' + results.affectedRows);
});

    res.json("ok");
}) 

// POST /api/users -> insere novo sorvete
app.post('/api/sorvete/actions/cadastrar', function(req, res) {
    console.log(req.body)
    let keys = Object.keys(req.body);
    let register = keys[0];
    console.log(register);
    let sabor = JSON.parse(register).sabor;
    let lote = parseInt(JSON.parse(register).lote);
    let preco = parseFloat(JSON.parse(register).preco);
    let descricao = JSON.parse(register).descricao;

    // SE NAO EXISTIR, CRIAR A TABELA SORVETE
    var sql_create = "CREATE TABLE IF NOT EXISTS sorvete (idSorvete int(11) NOT NULL AUTO_INCREMENT, sabor varchar(200) DEFAULT NULL, descricao varchar(200) DEFAULT NULL, lote int(255) NULL, precoUnitario decimal(9,2) DEFAULT NULL, PRIMARY KEY (idSorvete)";
    connection.query(sql_create, function (err, result) {
    if (err) throw err;
    console.log("Table created");
    });
 
      

    // INSERIR O REGISTRO NA TABELA USERS COM OS CAMPOS VINDOS DO FRONTEND
    let sql_intro = `INSERT INTO sorvete(idSorvete,sabor,descricao,lote,precoUnitario)  VALUES ?  `;
    let registro = [["", sabor, descricao, lote, preco]];
    connection.query("sql_intro", [registro], (err, results) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Row inserted:' + results.affectedRows);
});

    res.json("ok");
}) 


app.post('/api/users/actions/cadastrar', function(req, res) {
    let keys = Object.keys(req.body);
    let register = keys[0];

    let nome = JSON.parse(register).nome;
    let email = JSON.parse(register).email;
    let cpf = JSON.parse(register).cpf;
    let telefone = JSON.parse(register).telefone;
    let endereco = JSON.parse(register).endereco;
    let pass1 = JSON.parse(register).pass1;

    // SE NAO EXISTIR, CRIAR A TABELA USERS
    var sql_create = "CREATE TABLE IF NOT EXISTS users (nome VARCHAR(255), cpf VARCHAR(255) PRIMARY KEY, telefone VARCHAR(255), endereco VARCHAR(255), email VARCHAR(255), pass1 VARCHAR(255))";
    connection.query(sql_create, function (err, result) {
    if (err) throw err;
    console.log("Table created");
    });

    // INSERIR O REGISTRO NA TABELA USERS COM OS CAMPOS VINDOS DO FRONTEND
    let sql_intro = `INSERT INTO users(nome,cpf,telefone,endereco,email,pass1)  VALUES ?  `;
    let registro = [[nome, cpf, telefone, endereco, email, pass1]];
    connection.query(sql_intro, [registro], (err, results) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Row inserted:' + results.affectedRows);
});

    res.json("ok");
}) 

// POST /api/sorvete -> faz uma venda
app.post('/api/vendas', function(req, res) {
    console.log(req.body)
    let keys = Object.keys(req.body);
    let register = keys[0];
    console.log(register);
    // let cpf = JSON.parse(register).cpf;
    // let pedidos = parseInt(JSON.parse(register).pedidos);
    // console.log(cpf);
    // console.log(pedidos)
      
    

    res.json("ok");
}) 


app.listen(port, function() {
    console.log(`Server is running at localhost:${port}`)
}) 

