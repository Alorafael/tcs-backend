const express = require('express');
const router = express.Router();
const con = require("../database/database");


router.post('/', (req,res) => {

    const nome = req.body;

    con.connect(err => {
        if(err) {
            console.error('Error conecting to the database: ', err.message);
            return;
        }
        console.log('Connected to the MySql database.');
    })

    con.query(`INSERT INTO categorias (nome) VALUES (${nome})`, (err,results) => {
        if(err){
            console.error('Error conecting to the database: ', err.message);
            return;
        }
        return res.status(201).send({ "mensagem": 'sucesso!', "nome": nome});
    })

})

router.get('/', (req,res) => {

    con.connect(err => {
        if(err) {
            console.error('Error conecting to the database: ', err.message);
            return;
        }
        console.log('Connected to the MySql database.');
    })

})


router.put('/:id', (req,res) => {


})

router.delete('/:id', (req,res) => {


})

module.exports = router;