const express = require('express');
const users = require('./app/users');
const tasks = require('./app/tasks');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const port = 8000;
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

mongoose.connect('mongodb://localhost/todo', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    app.use('/users', users);
    app.use('/tasks', tasks);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    })
});