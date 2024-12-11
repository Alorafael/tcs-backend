const express = require('express');
const router = express();
const { con } = require("../database/database");
const jwt = require('jsonwebtoken');


router.use(express.json());
 
router.post("/", (req, res) =>{
    const { email, senha } = req.body;
    
    //Conexão Banco de Dados
    con.connect(err => {
        if(err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }
        console.log('Connected to the MySQL database.');
    })

    con.query(`SELECT * FROM users WHERE email = '${email}' and senha = '${senha}'`, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return;
        }
        if(results != ""){
            const token = jwt.sign({ id: results.id, email: results.email, role: results.role }, "webtoken", { expiresIn: '15m' });
            res.set('Authorization', `Bearer ${token}`);

            return res.status(200).send({ "token": `${token}` });
        }
        else{
            return res.status(401).send({ "mensagem": "Email e/ou senha invalidos" })
        };
    });
});

module.exports = router;