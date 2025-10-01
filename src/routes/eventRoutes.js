const express = require('express');
const router = express.Router();
const eventController = require('../controller/eventController');

router.get('/', eventController.getAll);
router.get('/:id', eventController.getById);
router.post('/new', eventController.create);
router.put('/:id', eventController.update);
router.delete('/:id', eventController.remove);

module.exports = router;