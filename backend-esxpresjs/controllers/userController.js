const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.get = async (req, res) => {
    try {
        const users = await userModel.get();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

exports.store = async (req, res) => {
    const { full_name, nick_name, email, password, role_id } = req.body;

    if (!full_name || !nick_name || !email || !password || !role_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const uuid = await userModel.store(full_name, nick_name, email, hashedPassword, role_id);
        res.status(201).json({ message: 'Data created successfully', uuid });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create data' });
    }
};

exports.find = async (req, res) => {
    const { uuid } = req.params;

    try {
        const user = await userModel.find(uuid);
        if (user.length === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.json(user[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

exports.update = async (req, res) => {
    const { uuid } = req.params;
    const { full_name, nick_name, email, password, role_id } = req.body;

    if (!full_name || !nick_name || !email || !password || !role_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        let hashedPassword = password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        await userModel.update(uuid, full_name, nick_name, email, hashedPassword, role_id);
        res.json({ message: 'Data updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update data' });
    }
};

exports.destroy = async (req, res) => {
    const { uuid } = req.params;

    try {
        await userModel.destroy(uuid);
        res.json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete data' });
    }
};

