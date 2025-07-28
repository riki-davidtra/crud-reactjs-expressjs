const db = require('./db');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const timeStamp = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

exports.findByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows;
};

exports.createUser = async (full_name, nick_name, email, hashedPassword) => {
    const uuid = uuidv4();
    const now = timeStamp(new Date());
    const role_id = 3;
    await db.query(
        'INSERT INTO users (uuid, created_at, updated_at, full_name, nick_name, email, password, role_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [uuid, now, now, full_name, nick_name, email, hashedPassword, role_id]
    );
};

exports.findById = async (userId) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    const results = await db.query(query, [userId]);
    return results;
};