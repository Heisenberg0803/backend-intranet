const express = require('express');
const router = express.Router();
const linkController = require('../controller/linksController');

router.get('/', linkController.getAll);
router.get('/:id', linkController.getById);
router.post('/new', linkController.createLink);
router.put('/:id', linkController.updateLink);
router.delete('/:id', linkController.deleteLink);

module.exports = router;