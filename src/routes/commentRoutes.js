const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');

router.get('/news/:newsId/comments',commentController.getAll);
router.get('/news/:newsId/comments/:commentNumber', commentController.getById);
router.post('/news/:newsId/comments/new', commentController.createComment);
router.delete('/news/:newsId/comments/:id', commentController.deleteComment);

module.exports = router;