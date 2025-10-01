const express = require('express');
const router = express.Router();
const newsController = require('../controller/newsController');

router.get('/', newsController.getAll);
router.get('/:id', newsController.getById);
router.post('/new', newsController.create);
router.put('/:id', newsController.update);
router.delete('/:id', newsController.remove);

module.exports = router;