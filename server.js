const express = require('express');
const cors = require('cors');
const server = express();
const users = require('./src/routes/users');
const login = require('./src/routes/login');
const logout = require('./src/routes/logout');
const categorias = require('./src/routes/categorias');
const avisos = require('./src/routes/avisos');

const PORT = 8080;

server.use(cors());
server.use("/usuarios", users);
server.use("/login", login);
server.use("/logout", logout);
server.use("/categorias", categorias)
server.use("/avisos", avisos)
server.listen(PORT, () => console.log(`Ouvindo na porta: ${PORT}`));