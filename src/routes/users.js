const express = require('express');
const router = express.Router();
require('dotenv').config();
router.use(express.json());
const { con } = require("../database/database");
const verifyToken = require("../helpers/index");

router.post('/', (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        if (nome.length >= 3 && nome.length <= 100) {
            if(email.length >= 3 && email.length <=100 && email.includes("@")){
                if(senha.length >=3 && senha.length <=6 && /^\d+$/.test(senha)){

                    //Conexão Banco de Dados
                    con.connect(err => {
                        if(err) {
                            console.error('Error connecting to the database:', err.message);
                            return;
                        }
                        console.log('Connected to the MySQL database.');
                    })

                    // Validação Email
                    con.query(`SELECT * FROM user WHERE email = '${email}'`, (err, results) => {
                        if (err) {
                            console.error('Error executing query:', err.message);
                            return;
                        }
                        if(results == ""){
                            //Cadastro do Usuário
                            con.query(`INSERT INTO user (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`, (err, results) =>{
                            if (err) {
                                console.error('Error executing query:', err.message);
                                return;
                            }
                            return res.status(201).send({ "mensagem": 'sucesso!', "email": email, "nome": nome, "senha": senha });
                            })
                        }
                        else{
                            return res.status(409).send({ "mensagem": "Email ja cadastrado" })
                        };
                    });

                }
                else{
                    return res.status(400).send({ "mensagem": "Dados Invalidos", "email": email, "nome": nome, "senha": senha })
                }
            }
            else{
                return res.status(400).send({ "mensagem": "Dados Invalidos", "email": email, "nome": nome, "senha": senha })
            }
        }
        else{
            return res.status(400).send({ "mensagem": "Dados Invalidos", "email": email, "nome": nome, "senha": senha })
        }
    }catch(error) {
        console.log(error);
        return res.json({"mensagem": 'Erro interno do servidor', success: false});
    }
});

router.get('/', (req, res) => {

    try{

        //verifyToken(token)

        //Conexão Banco de Dados
        con.connect(err => {
            if(err) {
                console.error('Error connecting to the database:', err.message);
                return;
            }
            console.log('Connected to the MySQL database.');
        })

        con.query(`SELECT * FROM user`, (err, results) =>{
            if (err) {
                console.error('Error executing query:', err.message);
                return;
            }
            data = [];
            results.forEach((element) => {
                json = {senha: element.senha, email: element.email, nome: element.nome};
                data.push(json)
            });
            json = JSON.stringify(data)
            return res.status(201).send(json);
            })        

        
        //return res.status(200).send(json);

    }

    catch(error){

        console.log(error);

        return res.json({"mensagem": 'Erro interno do servidor', success: false});

    }

});

router.get('/:email', (req,res) => {
    const email = req.params.email;

    con.connect(err => {
        if(err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }
        console.log('Connected to the MySQL database.');
    })

    con.query(`SELECT * FROM user WHERE email = '${email}'`, (err, results) => {
        if(err){
            console.error('Error conecting to the database: ', err.message);
            return;
        }
        console.log(results[0])
        return res.status(201).send({ "mensagem": "sucesso!", "email": results[0].email, "nome": results[0].nome, "senha": results[0].senha})
    })

})

router.put('/:email', (req,res) => {

    const email = req.params.email;
    const { nome, senha } = req.body;


    con.connect(err => {
        if(err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }
        console.log('Connected to the MySQL database.');
    })
    console.log(nome)
    console.log(senha)
    con.query(`UPDATE user SET nome = '${nome}', senha = '${senha}' WHERE email = '${email}'`, (err, results) => {
        if(err){
            console.error('Error conecting to the database: ', err.message);
            return;
        }
    })
    con.query(`SELECT * FROM user WHERE email = '${email}'`, (err, results) => {
        if(err){
            console.error('Error conecting to the database: ', err.message);
            return;
        }
        return res.status(201).send({ "mensagem": "sucesso!", "nome": results[0].nome, "senha": results[0].senha })
    })
})

router.delete('/:email', (req,res) => {

    const email = req.params.email;

    con.connect(err => {
        if(err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }
        console.log('Connected to the MySQL database.');
    })

    con.query(`DELETE FROM user WHERE email = '${email}'`, (err, results) => {
        if(err){
            console.error('Error conecting to the database: ', err.message);
            return;
        }
        return res.status(201).send()
    })
})

module.exports = router;