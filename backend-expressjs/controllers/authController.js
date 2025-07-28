const authModel = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
    const { full_name, nick_name, email, password } = req.body;

    if (!full_name || !nick_name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingUser = await authModel.findByEmail(email);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email is already in use', success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await authModel.createUser(full_name, nick_name, email, hashedPassword);

        res.status(201).json({ message: 'Registration successful', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Server error', success: false });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const userResults = await authModel.findByEmail(email);
        if (userResults.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password', success: false });
        }

        const user = userResults[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password', success: false });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, message: 'Login successful', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Server error', success: false });
    }
};

exports.me = async (req, res) => {
    try {
        const userId = req.user.id;
        const userResults = await authModel.findById(userId);

        if (!userResults || userResults.length === 0) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        const user = userResults[0];
        res.json({
            id: user.id,
            email: user.email,
            fullName: user.full_name,
            nickName: user.nick_name,
            roleId: user.role_id,
            message: 'User data retrieved successfully',
            success: true,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', success: false });
    }
};
