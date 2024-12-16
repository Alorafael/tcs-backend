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

    con.query(`SELECT * FROM categorias`, (err, results) => {
        if(err){
            console.error('Error conecting to the database: ', err.message);
            return;
        }
        return res.status(201).send({ "mensagem": 'sucesso!', "nome": nome})


    })
})


router.put('/:id', (req,res) => {
    const id = req.params.id;
    const nome = req.body

    con.connect(err => {
        if(err){
            console.error('Error conecting to the database: ', err.message);
            return;
        }
        return res.status(200).send({ })
    })

    con.query(`UPDATE categorias SET nome = ${nome} WHERE idcategoria = ${id}`, (err, results) => {
        if(err){
            console.error('Error conecting to the database: ', err.message);
            return;
        }
        return res.status(201).send({ "nome": nome })
    })

})

router.delete('/:id', (req,res) => {

    const id = req.params.id;

    con.connect(err => {
        if(err){
            console.error('Error conecting to the database: ', err.message);
            return;
        }
        return res.status(200).send({ })
    })

    con.query(`DELETE FROM categorias WHERE idcategoria = ${id}`, (err, results) => {
        if(err){
            console.error('Error conecting to the database: ', err.message);
            return;
        }
        return res.status(201).send({})
    })
})

module.exports = router;