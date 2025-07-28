const db = require('./db');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const timeStamp = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

exports.get = async () => {
    const [users] = await db.query('SELECT * FROM users');
    return users;
};

exports.store = async (full_name, nick_name, email, password, role_id) => {
    const uuid = uuidv4();
    const now = timeStamp(new Date());
    await db.query(
        'INSERT INTO users (uuid, created_at, updated_at, full_name, nick_name, email, password, role_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [uuid, now, now, full_name, nick_name, email, password, role_id]
    );
    return uuid;
};

exports.find = async (uuid) => {
    const [user] = await db.query('SELECT * FROM users WHERE uuid = ?', [uuid]);
    return user;
};

exports.update = async (uuid, full_name, nick_name, email, password, role_id) => {
    const updated_at = timeStamp(new Date());
    await db.query(
        'UPDATE users SET updated_at = ?, full_name = ?, nick_name = ?, email = ?, password = ?, role_id = ? WHERE uuid = ?',
        [updated_at, full_name, nick_name, email, password, role_id, uuid]
    );
};

exports.destroy = async (uuid) => {
    await db.query('DELETE FROM users WHERE uuid = ?', [uuid]);
};