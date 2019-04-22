const express = require('express');
const User = require('../models/User');
const bcrypt = require("bcrypt");

const router = express.Router();


router.post('/', async (req, res) => {
    const user = new User(req.body);

    user.generateToken();
    await user.save()
        .then(res.send({token: user.token}))
        .catch(error => res.sendStatus(400).send(error))
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});


    if (!user) {
        return res.status(400).send({error: 'Username not found'});
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Password is wrong'});
    }


    user.generateToken();
    await user.save();

    return res.send({token: user.token});
});


module.exports = router;