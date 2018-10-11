const express = require('express');
const controller = require('../controllers/notes');
const router = express.Router();

router.get('/', controller.getNotes);
router.post('/', controller.createNote);

module.exports = router;
