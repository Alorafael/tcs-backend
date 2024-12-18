const express = require('express');
const router = express.Router();
const { con } = require("../database/database");
const verifyToken = require("../helpers/index");
router.use(express.json())

router.post('/', (req,res) => {

    const { nome } = req.body;

    token = verifyToken(req)

    con.connect(err => {
        if(err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }
        console.log('Connected to the MySQL database.');
    })

    con.query(`SELECT * FROM token WHERE token = '${token}'`, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(404).send({ "mensagem": "Não autenticado" });
        }
        if(results == ""){
            return res.status(400).send({ "mensagem": "Token Invalido"});
        }
        con.query(`INSERT INTO categorias (nome) VALUES ('${nome}')`, (err,results) => {
            if(err){
                console.error('Error conecting to the database: ', err.message);
                return;
            }
            return res.status(201).send({ "mensagem": 'sucesso!', "nome": nome});
        })
    })

})

router.get('/', (req,res) => {

    token = verifyToken(req)

    con.connect(err => {
        if(err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }
        console.log('Connected to the MySQL database.');
    })

    con.query(`SELECT * FROM token WHERE token = '${token}'`, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(404).send({ "mensagem": "Não autenticado" });
        }
        if(results == ""){
            return res.status(400).send({ "mensagem": "Token Invalido"});
        }
        con.query(`SELECT * FROM categorias`, (err, results) => {
            if(err){
                console.error('Error conecting to the database: ', err.message);
                return;
            }
            data = [];
            results.forEach((element) => {
                json = {nome: element.nome};
                data.push(json)
            });
            json = JSON.stringify(data)
            return res.status(200).send(json);
        })
    })
})


router.put('/:id', (req,res) => {
    const id = req.params.id;
    const { nome } = req.body

    token = verifyToken(req)

    con.connect(err => {
        if(err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }
        console.log('Connected to the MySQL database.');
    })

    con.query(`SELECT * FROM token WHERE token = '${token}'`, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(404).send({ "mensagem": "Não autenticado" });
        }
        if(results == ""){
            return res.status(400).send({ "mensagem": "Token Invalido"});
        }
        con.query(`UPDATE categorias SET nome = '${nome}' WHERE idcategoria = '${id}'`, (err, results) => {
            if(err){
                console.error('Error conecting to the database: ', err.message);
                return;
            }
        })
    
        con.query(`SELECT * FROM categorias WHERE idcategoria = '${id}'`, (err, results) => {
            if(err){
                console.error('Error conecting to the database: ', err.message);
                return;
            }
            console.log(results[0])
            return res.status(201).send({ "mensagem": "sucesso!", "nome": results[0].nome });
        })
    })

})

router.delete('/:id', (req,res) => {

    const id = req.params.id;

    token = verifyToken(req)

    con.connect(err => {
        if(err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }
        console.log('Connected to the MySQL database.');
    })

    con.query(`SELECT * FROM token WHERE token = '${token}'`, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(404).send({ "mensagem": "Não autenticado" });
        }
        if(results == ""){
            return res.status(400).send({ "mensagem": "Token Invalido"});
        }
        con.query(`DELETE FROM categorias WHERE idcategoria = '${id}'`, (err, results) => {
            if(err){
                console.error('Error conecting to the database: ', err.message);
                return;
            }
            return res.status(201).send()
        })
    })
})

module.exports = router;