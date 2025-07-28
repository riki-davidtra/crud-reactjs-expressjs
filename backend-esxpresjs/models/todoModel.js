const db = require('./db');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const timeStamp = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

exports.get = async () => {
    const [todos] = await db.query('SELECT * FROM todos');
    return todos;
};

exports.store = async (title, description, status, priority, due_date, user_id) => {
    const uuid = uuidv4();
    const now = timeStamp(new Date());
    await db.query(
        'INSERT INTO todos (uuid, created_at, updated_at, title, description, status, priority, due_date, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [uuid, now, now, title, description, status, priority, due_date, user_id]
    );
    return uuid;
};

exports.find = async (uuid) => {
    const [todo] = await db.query('SELECT * FROM todos WHERE uuid = ?', [uuid]);
    return todo;
};

exports.update = async (uuid, title, description, status, priority, due_date, user_id) => {
    const now = timeStamp(new Date());
    await db.query(
        'UPDATE todos SET updated_at = ?, title = ?, description = ?, status = ?, priority = ?, due_date = ?, user_id = ? WHERE uuid = ?',
        [now, title, description, status, priority, due_date, user_id, uuid]
    );
};

exports.destroy = async (uuid) => {
    await db.query('DELETE FROM todos WHERE uuid = ?', [uuid]);
};