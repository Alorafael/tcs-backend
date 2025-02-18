const express = require('express');
const router = express.Router();
const { con } = require("../database/database");
const verifyToken = require("../helpers/index");
router.use(express.json())

router.post("/", (req,res) => {
    
    console.log(req.body);
    const { idCategoria, descricao } = req.body;

    console.log(idCategoria)
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
            return res.status(404).send({"mensagem": "Não autenticado" });
        }
        if(results == ""){
            return res.status(400).send({"mensagem": "Token Invalido"});
        }
        con.query(`INSERT INTO avisos (idcategoria, descricao) VALUES ('${idCategoria}', '${descricao}')`, (err,results) => {
            if(err){
                console.error('Error conecting to the database: ', err.message);
                return;
            }
            return res.status(201).send({ "mensagem": 'sucesso!', "idcategoria": idCategoria, "descricao": descricao});
        })
    })
})

router.get("/:idCategoria", (req,res) => {

    const idCategoria = req.params.idCategoria;
    console.log(idCategoria)
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
            return res.status(404).send({"mensagem": "Não autenticado" });
        }
        if(results == ""){
            return res.status(400).send({"mensagem": "Token Invalido"});
        }
        con.query(`SELECT * FROM avisos WHERE idcategoria = '${idCategoria}'`, (err, results) => {
            if(err){
                console.error('Error conecting to the database: ', err.message);
                return;
            }
            console.log(results)
            data = [];
            results.forEach((element) => {
                json = {id: element.idaviso, idcategoria: element.idcategoria, descricao: element.descricao};
                data.push(json)
            });
            json = JSON.stringify(data)
            return res.status(200).send(json);
        })
    })

})

router.put("/:id", (req,res) => {   
    const id = req.params.id;
    const { idCategoria, descricao } = req.body

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
            return res.status(403).send({"mensagem": "Não autenticado" });
        }
        if(results == ""){
            return res.status(403).send({"mensagem": "Token Invalido"});
        }
        con.query(`UPDATE avisos SET descricao = '${descricao}' WHERE idaviso = '${id}'`, (err, results) => {
            if(err){
                console.error('Error conecting to the database: ', err.message);
                return;
            }
        })
    
        con.query(`SELECT * FROM avisos WHERE idaviso = '${id}'`, (err, results) => {
            if(err){
                console.error('Error conecting to the database: ', err.message);
                return;
            }
            console.log(results[0])
            return res.status(200).send({"mensagem": "sucesso!", "id": results[0].idaviso, "idCategoria": results[0].idcategoria, "descricao": results[0].descricao});
        })
    })

})

router.delete("/:id", (req,res) => {

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
        con.query(`DELETE FROM avisos WHERE idaviso = '${id}'`, (err, results) => {
            if(err){
                console.error('Error conecting to the database: ', err.message);
                return;
            }
            return res.status(200).send()
        })
    })
})


module.exports = router;