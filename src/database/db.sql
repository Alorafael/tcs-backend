CREATE TABLE `users` (
  `idusers` int NOT NULL AUTO_INCREMENT,
  `email` varchar(60) DEFAULT NULL,
  `senha` varchar(6) DEFAULT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `admin` tinyint DEFAULT '0',
  PRIMARY KEY (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `categorias` (
  `idcategorias` int NOT NULL,
  `nome` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`idcategorias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `avisos` (
  `idavisos` int NOT NULL,
  `descricao` varchar(500) DEFAULT NULL,
  `idcategorias` int DEFAULT NULL,
  PRIMARY KEY (`idavisos`),
  KEY `idcategorias_idx` (`idcategorias`),
  CONSTRAINT `idcategorias` FOREIGN KEY (`idcategorias`) REFERENCES `categorias` (`idcategorias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
