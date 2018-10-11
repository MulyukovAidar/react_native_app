const express = require('express');
const controller = require('../controllers/users');
const router = express.Router();

router.get('/', controller.getUsers);
router.post('/auth', controller.auth);
router.post('/register', controller.register);

module.exports = router;
