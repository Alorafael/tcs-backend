const express = require('express');
const router = express();

router.use(express.json());
 
router.post("/", (req, res) =>{
    const token = req.headers['authorization']?.split(' ')[1];

    let blacklist = [];

    if (!token) {
        return res.status(400).json({ message: 'Token is required for logout' });
    }

    // Add the token to the blacklist
    blacklist.push(token);
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;