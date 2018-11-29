const express = require('express');
const router = express.Router();
const User = require('../models/cryptos.js');







router.put('/:id', (req, res)=>{
    User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedCrypto)=>{
        res.json(updatedCrypto);
    });
});




module.exports = router;
