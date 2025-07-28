const express = require('express');
const router = express.Router();
const { get, store, find, update, destroy } = require('../controllers/todoController');
// const { verifyToken } = require('../middleware/authMiddleware');

// Routes
router.get('/todos', get);
router.post('/todos', store);
router.get('/todos/:uuid', find);
router.put('/todos/:uuid', update);
router.delete('/todos/:uuid', destroy);

module.exports = router;
