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
            return err;
        }
        console.log('Connected to the MySQL database.');
    })

    con.query(`SELECT * FROM user WHERE email = '${email}' and senha = '${senha}'`, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return;
        }
        if(results != ""){
            let admin = results[0].admin
            if(admin == 1){
                admin = true;
            }
            else{
                admin = false;
            }
            const payload = { email: results[0].email, admin: admin };
            console.log(payload)
            const token = jwt.sign(payload, "WEB_TOKEN");
            jwt.verify(token, "WEB_TOKEN", (err, decoded) => {
                if (err) {
                  console.error('Token verification failed:', err);
                } else {
                  console.log('Decoded JWT:', decoded);
                  // Access the custom attributes from the decoded token
                  console.log('Email:', decoded.email);
                  console.log('Admin:', decoded.admin);
                }
              });
            console.log(token)
            con.query(`INSERT INTO token (email, token) VALUES ('${email}', '${token}')`)

            return res.status(200).send({ "token": `${token}` });
        }
        else{
            return res.status(401).send({ "mensagem": "Email e/ou senha invalidos" })
        };
    });
});

module.exports = router;