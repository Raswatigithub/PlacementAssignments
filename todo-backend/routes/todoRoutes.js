const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const newTodo = new Todo({
      task: req.body.task,
      completed: req.body.completed || false,
    });
    const todo = await newTodo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create TODO' });
  }
});


router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch TODOs' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { task: req.body.task, completed: req.body.completed },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update TODO' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete TODO' });
  }
});

module.exports = router;
