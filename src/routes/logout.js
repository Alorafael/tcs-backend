const express = require('express');
const router = express();

router.use(express.json());
 
router.post("/", (req, res) =>{
    const token = req.body;

    let blacklist = [];
});