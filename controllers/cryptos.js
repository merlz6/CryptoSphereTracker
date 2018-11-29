const express = require('express');
const router = express.Router();
const User = require('../models/cryptos.js');
const bcrypt = require('bcryptjs');

router.post('/', (req, res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser)=>{
        res.status(201).json({
            status:201,
            message:'user created'
        })
    });
});

router.put('/:id', (req, res)=>{
    User.findByIdAndUpdate(req.params._id, req.body, {new:true}, (err, updatedUser)=>{
        res.json(updatedUser);
    });
});








module.exports = router;
