const todoModel = require('../models/todoModel');
const bcrypt = require('bcryptjs');

exports.get = async (req, res) => {
    try {
        const todos = await todoModel.get();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

exports.store = async (req, res) => {
    const { title, description, status, priority, due_date, user_id } = req.body;

    if (!title || !description || !status || !priority || !due_date || !user_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const uuid = await todoModel.store(title, description, status, priority, due_date, user_id);
        res.status(201).json({ message: 'Data created successfully', uuid });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create data' });
    }
};

exports.find = async (req, res) => {
    const { uuid } = req.params;

    try {
        const todo = await todoModel.find(uuid);
        if (todo.length === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.json(todo[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

exports.update = async (req, res) => {
    const { uuid } = req.params;
    const { title, description, status, priority, due_date, user_id } = req.body;

    if (!title || !description || !status || !priority || !due_date || !user_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        await todoModel.update(uuid, title, description, status, priority, due_date, user_id);
        res.json({ message: 'Data updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update data' });
    }
};

exports.destroy = async (req, res) => {
    const { uuid } = req.params;

    try {
        await todoModel.destroy(uuid);
        res.json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete data' });
    }
};

