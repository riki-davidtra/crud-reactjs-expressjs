const express = require('express');
const router = express.Router();
const { get, store, find, update, destroy } = require('../controllers/userController');
// const { verifyToken } = require('../middleware/authMiddleware');

// Routes
router.get('/users', get);
router.post('/users', store);
router.get('/users/:uuid', find);
router.put('/users/:uuid', update);
router.delete('/users/:uuid', destroy);

module.exports = router;
