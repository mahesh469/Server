const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['top', 'middle', 'low'],
        default: 'top'
    },
    deadline: {
        type: Date,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
