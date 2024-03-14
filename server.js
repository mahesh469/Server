const express = require('express');
const mongoose = require('mongoose');
const TaskModel = require('./models/Task');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/taskDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());

app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.json({ tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

app.post('/api/tasks', async (req, res) => {
    const { task, priority, deadline } = req.body;
    const newTask = new TaskModel({
        task,
        priority,
        deadline
    });

    try {
        const savedTask = await newTask.save();
        res.status(201).json({ newTask: savedTask });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ error: 'Error adding task' });
    }
});

// Define additional endpoints for updating and deleting tasks if needed

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
