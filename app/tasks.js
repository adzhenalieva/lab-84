const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, (req, res) => {
    Task.find()
        .then(tasks => res.send(tasks))
        .catch(() => res.sendStatus(500))
});


router.post('/', auth, (req, res) => {
    const task = new Task(req.body);
    task.user = req.user._id;
    task.save()
        .then(result => res.send(result))
        .catch(() => res.sendStatus(400).send(error))
});


module.exports = router;