var express = require('express');
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

    var sql = "UPDATE cliente SET nome='"+nome+"', telefone='"+telefone+"', endereco='"+endereco+"', email='"+email+"' WHERE cpf = '"+cpf+"'";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records edited: " + result.affectedRows);
    });

    res.json("ok");
})

// POST /api/users/editar -> Editar um usuário
app.post('/api/sorvete/actions/editar', function(req, res) {
    let keys = Object.keys(req.body);
    let register = keys[0];

    let sabor = JSON.parse(register).sabor;
    let descricao = JSON.parse(register).descricao;
    let lote = JSON.parse(register).lote;
    let preco = JSON.parse(register).preco;

    var sql = "UPDATE sorvete SET sabor='"+sabor+"', descricao='"+descricao+"', lote='"+lote+"', preco='"+preco+"' WHERE sabor = '"+sabor+"'";
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

    let sql = "DELETE FROM cliente WHERE cpf = '"+register_CPF+"'";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
    });

    res.json("ok");
})

// POST /api/sorvete/excluir -> excluir sorvete
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


// POST /api/users/actions/buscar -> buscar usuario pelo nome
app.post('/api/users/actions/buscar', function(req, res) {
    res.header("Content-Type",'application/json');
    let keys = Object.keys(req.body);
    let nome = keys[0];
    console.log("BUSCA")
    console.log(nome)

    connection.query("SELECT * FROM cliente WHERE nome LIKE '%"+nome+"%'", function (err, result, fields) {
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
    connection.query("SELECT * FROM cliente", function (err, result, fields) {
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
    console.log("OK");
    let keys = Object.keys(req.body);
    let register = keys[0];

    let nome = JSON.parse(register).nome;
    let email = JSON.parse(register).email;
    let cpf = JSON.parse(register).cpf;
    let telefone = JSON.parse(register).telefone;
    let endereco = JSON.parse(register).endereco;

    console.log("bla")
    // SE NAO EXISTIR, CRIAR A TABELA USERS
      

    let sql_intro = `INSERT INTO cliente (idCliente,email,cpf,nome,telefone,endereco)  VALUES ?  `;
    let registro = [[0, email, parseInt(cpf), nome, parseInt(telefone), endereco]];
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
    let keys = Object.keys(req.body);
    let register = keys[0];
    let sabor = JSON.parse(register).sabor;
    let lote = parseInt(JSON.parse(register).lote);
    let preco = parseFloat(JSON.parse(register).preco);
    let descricao = JSON.parse(register).descricao;

    let sql_intro = `INSERT INTO sorvete(idSorvete,sabor,descricao,lote,precoUnitario)  VALUES ?  `;
    let registro = [[0, sabor, descricao, parseInt(lote), parseFloat(preco)]];
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
    let keys = Object.keys(req.body);
    let register = keys[0];

    let str_sabores = JSON.parse(register).str_sabores.substring(1);
    let str_quantidade = JSON.parse(register).str_quantidade.substring(1);
    let str_cpf = JSON.parse(register).str_cpf;
    let str_quantidadeTotal = JSON.parse(register).str_quantidadeTotal;
    let str_valorTotal = JSON.parse(register).str_valorTotal;


    let arry_sabores = str_sabores.split(",");
    let arry_quantidade = str_quantidade.split(",");
    

    // FAZENDO O PEDIDO !!!!!
    connection.query("select c.idCliente from cliente c where c.cpf = '"+ str_cpf +"'", function (err, res, fields) {
        if (err) throw err;
        var id = (JSON.parse(JSON.stringify(res))[0].idCliente);

        let sql_intro = `INSERT INTO pedido (idPedido,idCliente,qtde,preco)  VALUES ?  `;
        let registro = [[0, parseInt(id), parseInt(str_quantidadeTotal), parseFloat(str_valorTotal)]];
        connection.query(sql_intro, [registro], (err, results) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Row inserted:' + results.affectedRows);
        });
    });



    for (var i = 0; i < arry_quantidade.length; i++){
        let sabor = arry_sabores[i];
        let qtd = arry_quantidade[i];
        connection.query("select s.idSorvete from sorvete s where s.sabor = '"+ sabor +"'", function(err, res) {
            var id_sorvete = (JSON.parse(JSON.stringify(res))[0].idSorvete);
            var qtd_de_sorvete = qtd;

            var sql = "select max(p.idPedido) as max from pedido p";
            connection.query(sql, function (err, result) {
                if (err) throw err;
                var lat_id = JSON.parse(JSON.stringify(result))[0].max;
            

            let sql_intro = `INSERT INTO produtos_do_pedido (id,idSorvete,idPedido,qtde)  VALUES ?  `;
            let registro = [[0, parseInt(id_sorvete), parseInt(lat_id), parseInt(qtd_de_sorvete)]];
            connection.query(sql_intro, [registro], (err, results) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Row inserted:' + results.affectedRows);
            });
        });
            
        });

    }
    
}) 


// GET /api/users -> Lista os usuarios
app.get('/api/users/actions/relatorio01', function(req, res) {
    res.header("Content-Type",'application/json');
    connection.query("SELECT c.nome, c.idCliente, sum(qtde) as qtde FROM pedido p, cliente c where c.idCliente = p.idCliente GROUP BY p.idCliente ORDER BY qtde DESC", function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
})

// GET /api/users -> Lista os usuarios
app.get('/api/users/actions/top3', function(req, res) {
    res.header("Content-Type",'application/json');
    connection.query("SELECT c.nome, c.idCliente, sum(qtde) as qtde FROM pedido p, cliente c where c.idCliente = p.idCliente GROUP BY p.idCliente ORDER BY qtde DESC limit 3", function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
})

// GET /api/users -> Lista os usuarios
app.get('/api/users/actions/top3Sorvetes', function(req, res) {
    res.header("Content-Type",'application/json');
    connection.query("select S.sabor, sum(P.qtde) as total from sorvete S, produtos_do_pedido P where S.idSorvete = P.idSorvete group by S.sabor order by total desc limit 3", function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
})


app.listen(port, function() {
    console.log(`Server is running at localhost:${port}`)
}) 

