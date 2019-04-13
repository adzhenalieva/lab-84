const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, (req, res) => {
    const user = req.user._id;
    Task.find({user})
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

router.put('/:id', auth, async (req, res) => {
    const newTask = req.body;
    if (newTask.user) {
        res.status(401).send({error: "No way of changing user"})
    }
    const task = await Task.findById(req.params.id);

    task.description = newTask.description;
    task.title = newTask.title;
    task.status = newTask.status;

    task.save()
        .then(task => res.send(task))
        .catch((error) => res.status(500).send(error.message))

});

router.delete('/:id', auth, (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.send({message: "Success"}))
        .catch(() => res.sendStatus(500))
});


module.exports = router;