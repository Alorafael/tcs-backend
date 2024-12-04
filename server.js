const express = require('express');
const cors = require('cors');
const server = express();
const users = require('./src/routes/users');
const login = require('./src/routes/login');

const PORT = 8080;

server.use(cors());
server.use("/usuarios", users);
server.use("/login", login);
server.listen(PORT, () => console.log(`Ouvindo na porta: ${PORT}`));