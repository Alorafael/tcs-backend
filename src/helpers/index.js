const jwt = require('jsonwebtoken')
const { con } = require("../database/database");

const verifyToken = (req) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader.split(' ')[1];

    return token;

    // token = verifyToken(req)

    // con.connect(err => {
    //     if(err) {
    //         console.error('Error connecting to the database:', err.message);
    //         return;
    //     }
    //     console.log('Connected to the MySQL database.');
    // })

    // con.query(`SELECT * FROM token WHERE token = '${token}'`, (err, results) => {
    //     if (err) {
    //         console.error('Error executing query:', err.message);
    //         return res.status(404).send({ "mensagem": "Não autenticado" });
    //     }
    //     if(results == ""){
    //         return res.status(400).send({ "mensagem": "Token Invalido"});
    //     }
    // })
}

const verifyWebToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({ error: 'Token error' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token mal formatado' });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token invalido' });

        const { email, admin, id } = decoded;
        console.log(`Email: ${email}, Admin: ${admin}, ID: ${id}`);

        // Armazenar o payload na requisição para uso em outros lugares (se necessário)
        req.user = decoded;
        return next();
    })
};

module.exports = verifyToken;