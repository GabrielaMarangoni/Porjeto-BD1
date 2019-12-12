use gonni;

DROP TABLE IF EXISTS `produtos_do_pedido`;
DROP TABLE IF EXISTS `pedido`;
DROP TABLE IF EXISTS `sorvete`;
DROP TABLE IF EXISTS `cliente`;

CREATE TABLE IF NOT EXISTS `cliente` (
  `idCliente` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(200) NOT NULL UNIQUE,
  `cpf` bigint(11) NOT NULL UNIQUE, 
  `nome` varchar(200) DEFAULT NULL,
  `telefone` int(11) DEFAULT NULL,
  `endereco` varchar(200) DEFAULT NULL,
   PRIMARY KEY (`idCliente`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

#INSERT INTO `cliente` ( `email`, `cpf`, `nome`, `telefone`, `endereco`) VALUES
#( 'adm', 0, 'adm', 0, 'Brazil'),
#( 'abc', 1, 'abc', 1, 'Brazil'),
#( 'def', 2, 'def', 2, 'Brazil');

CREATE TABLE IF NOT EXISTS `sorvete` (
  `idSorvete` int(11) NOT NULL AUTO_INCREMENT,
  `sabor` varchar(200) DEFAULT NULL,
  `descricao` varchar(200) DEFAULT NULL,
  `lote` int(255) NULL,
  `precoUnitario` decimal(9,2) DEFAULT NULL,
  PRIMARY KEY (`idSorvete`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

INSERT INTO `sorvete` ( `sabor`, `lote`) VALUES
( 'Flocos', 50),
( 'Chocolate', 60),
( 'Milho-Verde', 20),
( 'Maracuja', 100),
( 'Morango', 34),
( 'Manga', 27);

CREATE TABLE IF NOT EXISTS `pedido` (
  `idCliente` int(11) NOT NULL,
  `idPedido` int(11) NOT NULL AUTO_INCREMENT,
  `qtde` int(11) NOT NULL DEFAULT '1',
  `preco` decimal(9,2) DEFAULT NULL,
  PRIMARY KEY (`idPedido`),
  FOREIGN KEY (`idCliente`) REFERENCES cliente(`idCliente`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

#INSERT INTO   `pedido` ( `idCliente`  ,   `qtde` , `preco`) VALUES
#( 1 , 12 , ' 6.00' );

#INSERT INTO   `pedido` ( `idCliente` ,  `qtde` , `preco`) VALUES
#( 2  , 1 , ' 1.50');

#INSERT INTO   `pedido` ( `idCliente`  ,  `qtde` , `preco`) VALUES
#( 3 , 8 , ' 12.00');

 select * from cliente;
 select * from pedido;
 select * from sorvete;
 
CREATE TABLE IF NOT EXISTS `produtos_do_pedido`(
  `idSorvete` int(11) NOT NULL,
  `idPedido` int(11) NOT NULL,
  `qtde` int (11) not null,
  `id` int(11) auto_increment primary key,
  FOREIGN KEY (`idPedido`) REFERENCES pedido(`idPedido`),
  FOREIGN KEY (`idSorvete`) REFERENCES sorvete(`idSorvete`)
)ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

#insert into `produtos_do_pedido`(`idSorvete`, `idPedido`, `qtde`) values
#( 2 , 1,  4  ),
#( 3 , 1,  8  );

#insert into `produtos_do_pedido`(`idSorvete`, `idPedido`, `qtde`) values
#( 2 , 2,  1  );

#insert into `produtos_do_pedido`(`idSorvete`, `idPedido`, `qtde`) values
#( 2 , 3,  4  ),
#( 3 , 3,  4  );

                                  
 SELECT c.nome, c.idCliente, sum(qtde) as qtde
 FROM pedido p, cliente c
 where c.idCliente = p.idCliente
 GROUP BY p.idCliente
 ORDER BY qtde DESC;

select C.nome, c.idCliente, sum(P.qtde) as total
from cliente C, pedido P
where C.idCliente = P.idCliente
group by C.nome
order by total desc
limit 3;

select S.sabor, sum(P.qtde) as total
from sorvete S, produtos_do_pedido P
where S.idSorvete = P.idSorvete
group by S.sabor
order by total desc
limit 3;

select c.idCliente, c.nome
from cliente c
where c.cpf = '';

select s.idSorvete, s.lote
from sorvete s
where s.sabor = '';

select max(p.idPedido) as a
from  pedido p;