const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        required: true,
        enum: ["new", "in_progress", "complete"]
    }
});

const Task = mongoose.model('Category', TaskSchema);
module.exports = Task;